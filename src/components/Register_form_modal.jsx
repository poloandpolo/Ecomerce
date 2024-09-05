import React from 'react';
import { useForm } from 'react-hook-form';
import './styles/Register_form_modal.css';
import { registerUserService } from '../services/userServices';

export const Register_form_modal = ({ onClose, onOpenLoginModal }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formattedData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      role: data.role.toUpperCase(), // Convertir el valor de role a mayúsculas
    };

    try {
      const response = await registerUserService(formattedData);

      if (response.status === 201) {
        console.log("User created successfully");
        onClose(); // Cierra el modal de registro
        onOpenLoginModal(); // Abre el modal de inicio de sesión
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error en el registro. Por favor, inténtelo de nuevo.'); // Mostrar alerta en caso de error
    }
  };

  return (
    <div className="Register-form-modal-overlay" onClick={onClose}>
      <div className="Register-form-modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            {...register('first_name')}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            {...register('last_name')}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register('email')}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register('password')}
          />
          <div className="Register-form-modal-gender-wrapper">
            <label>Gender:</label>
            <select name="gender" {...register('gender')}>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>
          <div className="Register-form-modal-role-wrapper">
            <label>Role:</label>
            <select name="role" {...register('role')}>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
