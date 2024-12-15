import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../pages/SignUp';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '.././firebaseConfig';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(() => ({})),
}));

global.alert = jest.fn();

describe('SignUp Component', () => {
  beforeEach(() => {
    render(<SignUp />);
  });

  jest.spyOn(console, 'warn').mockImplementation(() => {});

  test('allows users to type in input fields', () => {
    fireEvent.change(
      screen.getByPlaceholderText('Phone Number (+1234567890)'),
      { target: { value: '+1234567890' } }
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    });

    expect(
      screen.getByPlaceholderText('Phone Number (+1234567890)').value
    ).toBe('+1234567890');
    expect(screen.getByPlaceholderText('Username').value).toBe('testuser');
    expect(screen.getByPlaceholderText('Email').value).toBe(
      'testuser@example.com'
    );
    expect(screen.getByPlaceholderText('Password').value).toBe('password123');
    expect(screen.getByPlaceholderText('Confirm Password').value).toBe(
      'password123'
    );
  });

  test('toggles password visibility in both password fields', () => {
    const passwordField = screen.getByPlaceholderText('Password');
    const confirmPasswordField =
      screen.getByPlaceholderText('Confirm Password');
    const icons = screen.getAllByAltText('Show password');

    fireEvent.click(icons[0]);
    expect(passwordField.type).toBe('text');
    fireEvent.click(icons[0]);
    expect(passwordField.type).toBe('password');

    fireEvent.click(icons[1]);
    expect(confirmPasswordField.type).toBe('text');
    fireEvent.click(icons[1]);
    expect(confirmPasswordField.type).toBe('password');
  });

  test('toggles password visibility for both password fields when eye icon is clicked', () => {
    const passwordField = screen.getByPlaceholderText('Password');
    const confirmPasswordField =
      screen.getByPlaceholderText('Confirm Password');
    const icons = screen.getAllByAltText('Show password');

    fireEvent.click(icons[0]);
    expect(passwordField.type).toBe('text');
    fireEvent.click(icons[0]);
    expect(passwordField.type).toBe('password');

    fireEvent.click(icons[1]);
    expect(confirmPasswordField.type).toBe('text');
    fireEvent.click(icons[1]);
    expect(confirmPasswordField.type).toBe('password');
  });

  test('password is hidden by default', () => {
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput.type).toBe('password');
  });

  test('calls createUserWithEmailAndPassword when valid data is provided', async () => {
    fireEvent.change(
      screen.getByPlaceholderText('Phone Number (+1234567890)'),
      {
        target: { value: '+1234567890' },
      }
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'testuser@example.com',
        'password123'
      );
    });
  });
});
