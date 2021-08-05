import { render, screen } from '@testing-library/react';
import App from './App';
// import component
// import React
import '@testing-library/jes-dom/extend-expect';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
