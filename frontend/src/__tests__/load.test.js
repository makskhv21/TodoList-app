import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: 'test-uid' },
  })),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

describe('SignUp Form Load Test', () => {
  it('should handle multiple sign up submissions', async () => {
    const numberOfSubmissions = 100;

    render(<SignUp />);

    const phoneInput = screen.getByPlaceholderText(
      'Phone Number (+1234567890)'
    );
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByText('Sign Up');

    for (let i = 0; i < numberOfSubmissions; i++) {
      fireEvent.change(phoneInput, { target: { value: `+12345678${i}` } });
      fireEvent.change(usernameInput, { target: { value: `TestUser${i}` } });
      fireEvent.change(emailInput, {
        target: { value: `testuser${i}@example.com` },
      });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'password123' },
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
          auth,
          `testuser${i}@example.com`,
          'password123'
        );
      });
    }
  });
});

describe('Login Form Load Test', () => {
  it('should handle multiple login attempts', async () => {
    const numberOfLoginAttempts = 100;

    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: 'test-uid' },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    for (let i = 0; i < numberOfLoginAttempts; i++) {
      fireEvent.change(emailInput, {
        target: { value: `testuser${i}@example.com` },
      });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
          auth,
          `testuser${i}@example.com`,
          'password123'
        );
      });
    }
  });
});

describe('Large Data Input Test', () => {
  it('should handle large email and password inputs during sign up', async () => {
    render(<SignUp />);

    const phoneInput = screen.getByPlaceholderText(
      'Phone Number (+1234567890)'
    );
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByText('Sign Up');

    const largeEmail = 'a'.repeat(255) + '@example.com';
    const largePassword = 'a'.repeat(128);

    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    fireEvent.change(usernameInput, { target: { value: 'TestUserLargeData' } });
    fireEvent.change(emailInput, { target: { value: largeEmail } });
    fireEvent.change(passwordInput, { target: { value: largePassword } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: largePassword },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        largeEmail,
        largePassword
      );
    });
  });
});

describe('Network Delay Simulation Test', () => {
  it('should handle network delays while interacting with Firebase', async () => {
    signInWithEmailAndPassword.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ user: { uid: 'test-uid' } }), 500)
        )
    );

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'testuser@example.com',
        'password123'
      );
    });
  });
});
