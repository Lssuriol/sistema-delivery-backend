import { useState, useEffect } from 'react';
import api from '../services/api';

function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    logo: null,
  });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const cargarRestaurantes = async () => {
    try {
      const response = await api.get('restaurantes/');
      setRestaurantes(response.data);
    } catch (error) {
      console.error('Error al cargar:', error);
    }
  };

  useEffect(() => {
    cargarRestaurantes();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'logo') {
      setFormulario({ ...formulario, logo: e.target.files[0] });
    } else {
      setFormulario({ ...formulario, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nombre', formulario.nombre);
      formData.append('direccion', formulario.direccion);
      formData.append('telefono', formulario.telefono);
      if (formulario.logo) {
        formData.append('logo', formulario.logo);
      }

      if (editando) {
        await api.put(`restaurantes/${editando}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMensaje('✅ Restaurante actualizado correctamente');
      } else {
        await api.post('restaurantes/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMensaje('✅ Restaurante creado correctamente');
      }
      setFormulario({ nombre: '', direccion: '', telefono: '', logo: null });
      setEditando(null);
      cargarRestaurantes();
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error:', error);
      setMensaje('❌ Error al guardar');
    }
  };

  const handleEdit = (restaurante) => {
    setFormulario({
      nombre: restaurante.nombre,
      direccion: restaurante.direccion,
      telefono: restaurante.telefono,
      logo: null,
    });
    setEditando(restaurante.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este restaurante?')) {
      try {
        await api.delete(`restaurantes/${id}/`);
        cargarRestaurantes();
        setMensaje('🗑️ Restaurante eliminado');
        setTimeout(() => setMensaje(''), 3000);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormulario({ nombre: '', direccion: '', telefono: '', logo: null });
    setEditando(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
         Gestión de Restaurantes
      </h2>

      {mensaje && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 text-center">
          {mensaje}
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h3 className="text-2xl font-semibold text-orange-500 mb-4">
          {editando ? '✏️ Editar Restaurante' : '➕ Nuevo Restaurante'}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del restaurante"
            value={formulario.nombre}
            onChange={handleChange}
            required
            className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formulario.direccion}
            onChange={handleChange}
            required
            className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none"
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formulario.telefono}
            onChange={handleChange}
            required
            className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none"
          />
          <div className="md:col-span-3">
            <label className="block text-gray-700 font-medium mb-2">
               Logo del restaurante:
            </label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div className="md:col-span-3 flex gap-2">
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
        {restaurantes.map((restaurante) => (
          <div
            key={restaurante.id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-orange-500"
          >
            {restaurante.logo && (
              <img
                src={restaurante.logo}
                alt={restaurante.nombre}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
            )}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {restaurante.nombre}
            </h3>
            <p className="text-gray-600 text-sm mb-1">📍 {restaurante.direccion}</p>
            <p className="text-gray-600 text-sm mb-4"> {restaurante.telefono}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(restaurante)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg text-sm transition"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => handleDelete(restaurante.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm transition"
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {restaurantes.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-8">
          No hay restaurantes registrados aún. ¡Crea el primero! 🚀
        </p>
      )}
    </div>
  );
}

export default Restaurantes;