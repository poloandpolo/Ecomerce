import React from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import './styles/Register_product_form_modal.css';
import { AuthContext } from './context/AuthContext'; // Asegúrate de que la ruta sea correcta
import { registerNewProduct } from '../services/userServices'; // Asegúrate de importar el servicio correcto

export const Register_product_form_modal = ({ onClose }) => {
  const { register, handleSubmit } = useForm();
  const { fetchItems } = useContext(AuthContext); // Acceder a fetchItems desde el contexto

  const onSubmit = async (data) => {
    const formattedData = {
      product_name: data.product_name,
      description: data.description,
      price: parseFloat(data.price), // Convertir el precio a número
      category: data.category,
      brand: data.brand,
      sku: data.sku,
      image: data.image
    };

    try {
      const token = localStorage.getItem('token'); // Obtener el token desde localStorage
      const response = await registerNewProduct(formattedData, token);

      if (response.status === 200) {
        console.log("Product registered successfully");
        await fetchItems(); // Llamar a fetchItems después del registro
        onClose(); // Cierra el modal de registro
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error en el registro del producto. Por favor, inténtelo de nuevo.'); // Mostrar alerta en caso de error
    }
  };

  return (
    <div className="Register-product-form-modal-overlay" onClick={onClose}>
      <div className="Register-product-form-modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            {...register('product_name')}
          />
          <textarea
            name="description"
            placeholder="Description"
            {...register('description')}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            {...register('price')}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            {...register('category')}
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            {...register('brand')}
          />
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            {...register('sku')}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            {...register('image')}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
