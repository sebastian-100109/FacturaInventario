import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';

test('envía el formulario de registro', () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  // Aquí van tus interacciones y assertions
  fireEvent.change(screen.getByLabelText(/nombre/i), {
    target: { value: 'Juan' }
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'juan@example.com' }
  });
  fireEvent.change(screen.getByLabelText(/contraseña/i), {
    target: { value: '123456' }
  });

  fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

  // Aquí podrías verificar si se redirigió o si se mostró un mensaje, etc.
});