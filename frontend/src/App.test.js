import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza el título de inicio de sesión', () => {
  render(<App />);
  const titleElement = screen.getByText(/iniciar sesión/i);
  expect(titleElement).toBeInTheDocument();
});