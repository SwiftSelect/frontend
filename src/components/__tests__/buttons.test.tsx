import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PrimaryButton, IconButton, BackButton } from '../buttons';

describe('Button Components', () => {
  describe('PrimaryButton', () => {
    it('renders with children', () => {
      render(<PrimaryButton>Click me</PrimaryButton>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<PrimaryButton onClick={handleClick}>Click me</PrimaryButton>);
      fireEvent.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has correct styling classes', () => {
      render(<PrimaryButton>Click me</PrimaryButton>);
      const button = screen.getByText('Click me');
      expect(button).toHaveClass('bg-purple-600', 'hover:bg-purple-700', 'text-white', 'rounded-lg');
    });
  });

  describe('IconButton', () => {
    it('renders with children', () => {
      render(<IconButton>Icon</IconButton>);
      expect(screen.getByText('Icon')).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<IconButton onClick={handleClick}>Icon</IconButton>);
      fireEvent.click(screen.getByText('Icon'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has correct styling classes', () => {
      render(<IconButton>Icon</IconButton>);
      const button = screen.getByText('Icon');
      expect(button).toHaveClass('text-purple-500');
    });
  });

  describe('BackButton', () => {
    it('renders with back arrow icon', () => {
      render(<BackButton />);
      const icon = screen.getByRole('button').querySelector('i');
      expect(icon).toHaveClass('fa-solid', 'fa-arrow-left');
    });

    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<BackButton onClick={handleClick} />);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has correct styling classes', () => {
      render(<BackButton />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-purple-500', 'mr-4');
    });
  });
}); 