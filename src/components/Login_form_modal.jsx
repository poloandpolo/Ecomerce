import React from 'react';
import { useForm } from 'react-hook-form';
import './styles/Login_form_modal.css';
import { loginUserService, getMeUserService } from '../services/userServices';
import { useAuthContext } from './hooks/useAuth';

export const Login_form_modal = ({ onClose }) => {
  const { login, setUser } = useAuthContext(); // Incluir setUser del contexto

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUserService(data);

      if (response.status === 200) {
        console.log("User logged successfully");
        const token = response.data.token;
        login(token);
        localStorage.setItem('token', token);

        // Usar getMeUserService con el token
        const userResponse = await getMeUserService(token);
        console.log("User data:", userResponse.data);
        setUser(userResponse.data); // Guardar la información del usuario en el contexto
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error en el registro. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="Login-form-modal-overlay" onClick={onClose}>
      <div className="Login-form-modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
