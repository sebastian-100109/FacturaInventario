import { render, screen, fireEvent } from '@testing-library/react';
import ClientForm from './ClientForm';


test('permite editar un cliente existente', () => {
  render(<ClientForm />);

  // Agregar cliente primero
  fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Maria' } });
  fireEvent.change(screen.getByLabelText(/NIT/i), { target: { value: '98765' } });
  fireEvent.click(screen.getByText(/Guardar/));

  // Editar
  fireEvent.click(screen.getByText(/Editar/));
  fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Maria Actualizada' } });
  fireEvent.click(screen.getByText(/Actualizar/));

  expect(screen.getByText('Maria Actualizada')).toBeInTheDocument();
});