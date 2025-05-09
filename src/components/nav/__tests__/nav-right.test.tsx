import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavRight from '../nav-right';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn()
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('NavRight Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders login button when user is not authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    
    render(<NavRight />);
    
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.closest('a')).toHaveAttribute('href', '/login');
  });

  it('renders dashboard link when authenticated user is on home page', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { id: '123' } }
    });
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<NavRight />);
    
    const dashboardLink = screen.getByText('Dashboard');
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink.closest('a')).toHaveAttribute('href', '/candidate');
  });

  it('renders logout button and profile link when authenticated user is not on home page', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { id: '123' } }
    });
    (usePathname as jest.Mock).mockReturnValue('/candidate');
    
    render(<NavRight />);
    
    // Check logout button
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
    
    // Check profile link
    const profileLink = screen.getByRole('link', { name: /Profile/i });
    expect(profileLink).toHaveAttribute('href', '/profile');
    
    // Check profile image
    const profileImage = screen.getByAltText('Profile');
    expect(profileImage).toHaveClass('w-8', 'h-8', 'rounded-full', 'border-2', 'border-purple-500');
  });

  it('calls signOut when logout button is clicked', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { id: '123' } }
    });
    (usePathname as jest.Mock).mockReturnValue('/candidate');
    (signOut as jest.Mock).mockResolvedValue(undefined);
    
    // Mock window.location
    const mockLocation = { href: '' };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true
    });
    
    render(<NavRight />);
    
    const logoutButton = screen.getByText('Logout');
    await fireEvent.click(logoutButton);
    
    expect(signOut).toHaveBeenCalledWith({ redirect: false });
    expect(window.location.href).toBe('/');
  });
}); 