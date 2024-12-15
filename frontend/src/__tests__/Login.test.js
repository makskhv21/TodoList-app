import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { BrowserRouter } from 'react-router-dom';

jest.mock('firebase/auth');

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Login Component', () => {
  test('toggles password visibility', () => {
    renderWithRouter(<Login onLogin={jest.fn()} />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const toggleButton = screen.getByAltText('Show password');

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('renders sign up link', () => {
    renderWithRouter(<Login onLogin={jest.fn()} />);

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('calls signInWithEmailAndPassword on form submit', async () => {
    renderWithRouter(<Login onLogin={jest.fn()} />);
    const email = 'test@example.com';
    const password = 'password123';

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: email },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: password },
    });

    const submitButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        email,
        password
      )
    );
  });

  test('disables the login button while loading', async () => {
    renderWithRouter(<Login onLogin={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: /Login/i });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
  });

  test('redirects to /app after successful login (1)', async () => {
    renderWithRouter(<Login onLogin={jest.fn()} />);

    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { email: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(window.location.pathname).toBe('/app'));
  });

  test('redirects to /app after successful login (2)', async () => {
    renderWithRouter(<Login onLogin={jest.fn()} />);

    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { email: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(window.location.pathname).toBe('/app'));
  });
});
