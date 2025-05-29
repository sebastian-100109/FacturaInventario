import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from './ProductForm';

test('no permite agregar productos con ID duplicado', () => {
  window.alert = jest.fn(); // mockear alert

  render(<ProductForm />);

  // El producto con ID '01' ya existe por defecto
  fireEvent.change(screen.getByLabelText(/ID:/i), {
    target: { value: '01' }
  });
  fireEvent.change(screen.getByLabelText(/Descripción:/i), {
    target: { value: 'Producto duplicado' }
  });
  fireEvent.change(screen.getByLabelText(/Precio:/i), {
    target: { value: '10.00' }
  });

  fireEvent.click(screen.getByText(/Guardar Producto/i));

  // Se espera que se muestre una alerta indicando que el ID ya existe
  expect(window.alert).toHaveBeenCalledWith('Ya existe un producto con ese ID');
});
