import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from '../nav';

// Mock the NavRight component since we'll test it separately
jest.mock('../nav-right', () => {
  return function MockNavRight() {
    return <div data-testid="mock-nav-right">NavRight</div>;
  };
});

// Mock next-auth SessionProvider
jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Nav Component', () => {
  it('renders the logo and brand name', () => {
    render(<Nav />);
    
    // Check for SwiftSelect text
    expect(screen.getByText('SwiftSelect')).toBeInTheDocument();
    
    // Check for brain icon
    const brainIcon = screen.getByRole('link', { name: /SwiftSelect/i }).querySelector('i');
    expect(brainIcon).toHaveClass('fa-solid', 'fa-brain', 'mr-2');
  });

  it('has correct styling classes', () => {
    render(<Nav />);
    
    // Check header styling
    const header = screen.getByRole('banner');
    expect(header).toHaveClass(
      'fixed',
      'w-full',
      'bg-gray-900/95',
      'backdrop-blur-sm',
      'border-b',
      'border-gray-800',
      'z-50'
    );
  });

  it('renders the NavRight component', () => {
    render(<Nav />);
    expect(screen.getByTestId('mock-nav-right')).toBeInTheDocument();
  });

  it('has clickable home link', () => {
    render(<Nav />);
    const homeLink = screen.getByRole('link', { name: /SwiftSelect/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
}); 