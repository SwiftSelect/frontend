import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CollapsibleSection from '../collapsible-section';

describe('CollapsibleSection Component', () => {
  const mockTitle = 'Test Section';
  const mockChildren = <div>Test Content</div>;

  it('renders with the correct title', () => {
    render(
      <CollapsibleSection title={mockTitle}>
        {mockChildren}
      </CollapsibleSection>
    );
    
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it('shows content by default when defaultOpen is true', () => {
    render(
      <CollapsibleSection title={mockTitle} defaultOpen={true}>
        {mockChildren}
      </CollapsibleSection>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('hides content by default when defaultOpen is false', () => {
    render(
      <CollapsibleSection title={mockTitle} defaultOpen={false}>
        {mockChildren}
      </CollapsibleSection>
    );
    
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('toggles content visibility when clicked', () => {
    render(
      <CollapsibleSection title={mockTitle} defaultOpen={false}>
        {mockChildren}
      </CollapsibleSection>
    );
    
    // Content should be hidden initially
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    
    // Click to open
    fireEvent.click(screen.getByText(mockTitle));
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    
    // Click to close
    fireEvent.click(screen.getByText(mockTitle));
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('has correct styling classes', () => {
    render(
      <CollapsibleSection title={mockTitle}>
        {mockChildren}
      </CollapsibleSection>
    );
    
    // Check container styling
    const container = screen.getByText(mockTitle).closest('div');
    expect(container?.parentElement).toHaveClass('bg-gray-800', 'rounded-xl', 'p-6');
    
    // Check title styling
    const title = screen.getByText(mockTitle);
    expect(title).toHaveClass('text-xl', 'font-semibold');
    
    // Check arrow icon styling when open
    const arrow = container?.querySelector('svg');
    expect(arrow).toHaveClass('rotate-180');
  });

  it('animates arrow icon on toggle', () => {
    render(
      <CollapsibleSection title={mockTitle} defaultOpen={false}>
        {mockChildren}
      </CollapsibleSection>
    );
    
    const arrow = screen.getByText(mockTitle)
      .closest('div')
      ?.querySelector('svg');
    
    // Initially not rotated
    expect(arrow).not.toHaveClass('rotate-180');
    
    // Click to open - should rotate
    fireEvent.click(screen.getByText(mockTitle));
    expect(arrow).toHaveClass('rotate-180');
    
    // Click to close - should rotate back
    fireEvent.click(screen.getByText(mockTitle));
    expect(arrow).not.toHaveClass('rotate-180');
  });
}); 