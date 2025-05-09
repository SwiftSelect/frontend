import 'whatwg-fetch';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }))
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: null })),
  signIn: jest.fn(),
  signOut: jest.fn()
})); 