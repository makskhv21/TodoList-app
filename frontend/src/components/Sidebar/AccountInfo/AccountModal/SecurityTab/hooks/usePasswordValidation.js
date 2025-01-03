import { useState } from 'react';

const usePasswordValidation = () => {
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);

  const checkPasswordStrength = (password) => {
    const errors = [];
    if (password.length < 6) errors.push('Password is too short');
    if (!/[A-Z]/.test(password))
      errors.push('Password must contain at least one uppercase letter');
    if (!/\d/.test(password))
      errors.push('Password must contain at least one number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push('Password must contain at least one special character');

    setPasswordErrors(errors);

    if (errors.length === 0) {
      setPasswordStrength(
        password.length < 8
          ? 'Weak'
          : password.length < 12
            ? 'Medium'
            : 'Strong'
      );
    } else {
      setPasswordStrength('Weak');
    }
  };

  return { passwordStrength, passwordErrors, checkPasswordStrength };
};

export default usePasswordValidation;
