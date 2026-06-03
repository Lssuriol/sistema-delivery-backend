import { useState, useEffect } from 'react';
import api from '../services/api';

function Platos() {
  const [platos, setPlatos] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: null,
    restaurante: '',
  });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const cargarDatos = async () => {
    try {
      const [platosRes, restaurantesRes] = await Promise.all([
        api.get('platos/'),
        api.get('restaurantes/'),
      ]);
      setPlatos(platosRes.data);
      setRestaurantes(restaurantesRes.data);
    } catch (error) {
      console.error('Error al cargar:', error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'imagen') {
      setFormulario({ ...formulario, imagen: e.target.files[0] });
    } else {
      setFormulario({ ...formulario, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nombre', formulario.nombre);
      formData.append('precio', formulario.precio);
      formData.append('descripcion', formulario.descripcion);
      formData.append('restaurante', formulario.restaurante);
      if (formulario.imagen) {
        formData.append('imagen', formulario.imagen);
      }

      if (editando) {
        await api.put(`platos/${editando}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMensaje('✅ Plato actualizado correctamente');
      } else {
        await api.post('platos/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMensaje('✅ Plato creado correctamente');
      }
      setFormulario({ nombre: '', precio: '', descripcion: '', imagen: null, restaurante: '' });
      setEditando(null);
      cargarDatos();
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error:', error);
      setMensaje('❌ Error al guardar');
    }
  };

  const handleEdit = (plato) => {
    setFormulario({
      nombre: plato.nombre,
      precio: plato.precio,
      descripcion: plato.descripcion,
      imagen: null,
      restaurante: plato.restaurante,
    });
    setEditando(plato.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este plato?')) {
      try {
        await api.delete(`platos/${id}/`);
        cargarDatos();
        setMensaje('️ Plato eliminado');
        setTimeout(() => setMensaje(''), 3000);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormulario({ nombre: '', precio: '', descripcion: '', imagen: null, restaurante: '' });
    setEditando(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        🍽️ Gestión de Platos
      </h2>

      {mensaje && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 text-center">
          {mensaje}
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h3 className="text-2xl font-semibold text-orange-500 mb-4">
          {editando ? '️ Editar Plato' : '➕ Nuevo Plato'}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del plato"
            value={formulario.nombre}
            onChange={handleChange}
            required
            className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none"
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            step="0.01"
            value={formulario.precio}
            onChange={handleChange}
            required
            className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none"
          />
          <textarea
            name="descripcion"
            placeholder="Descripción del plato"
            value={formulario.descripcion}
            onChange={handleChange}
            required
            rows="3"
            className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none md:col-span-2"
          />
          <select
            name="restaurante"
            value={formulario.restaurante}
            onChange={handleChange}
            required
            className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none"
          >
            <option value="">-- Selecciona un restaurante --</option>
            {restaurantes.map((rest) => (
              <option key={rest.id} value={rest.id}>
                {rest.nombre}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
            required={!editando}
            className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none"
          />
          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              {editando ? '💾 Actualizar' : '➕ Crear'}
            </button>
            {editando && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                ❌ Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platos.map((plato) => (
          <div
            key={plato.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border-t-4 border-orange-500"
          >
            {plato.imagen && (
              <img
                src={plato.imagen}
                alt={plato.nombre}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {plato.nombre}
              </h3>
              <p className="text-orange-500 font-bold text-lg mb-2">
                S/ {plato.precio}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                {plato.descripcion}
              </p>
              <p className="text-gray-500 text-xs mb-4">
                🏪 {plato.restaurante_nombre || `Restaurante ID: ${plato.restaurante}`}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(plato)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg text-sm transition"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(plato.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm transition"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {platos.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-8">
          No hay platos registrados aún. ¡Crea el primero! 
        </p>
      )}
    </div>
  );
}

export default Platos;