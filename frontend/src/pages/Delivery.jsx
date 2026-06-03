import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Delivery() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);
  const [platos, setPlatos] = useState([]);
  const [mensajePedido, setMensajePedido] = useState('');

  useEffect(() => {
    const cargarRestaurantes = async () => {
      try {
        const response = await api.get('restaurantes/');
        setRestaurantes(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    cargarRestaurantes();
  }, []);

  const verMenu = async (restaurante) => {
    setRestauranteSeleccionado(restaurante);
    try {
      const response = await api.get('platos/');
      const platosDelRestaurante = response.data.filter(
        (plato) => plato.restaurante === restaurante.id
      );
      setPlatos(platosDelRestaurante);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const volver = () => {
    setRestauranteSeleccionado(null);
    setPlatos([]);
  };

  const pedir = (plato) => {
    setMensajePedido(`Pedido confirmado: ${plato.nombre} - S/ ${plato.precio}`);
    setTimeout(() => setMensajePedido(''), 3000);
  };

  // Vista del menú de un restaurante
  if (restauranteSeleccionado) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <button onClick={volver} className="text-orange-500 hover:underline mb-4">
          ← Volver a restaurantes
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{restauranteSeleccionado.nombre}</h1>
          <p className="text-gray-600">📍 {restauranteSeleccionado.direccion}</p>
          <p className="text-gray-600">📞 {restauranteSeleccionado.telefono}</p>
        </div>

        {mensajePedido && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {mensajePedido}
          </div>
        )}

        <h2 className="text-3xl font-bold text-gray-800 mb-6">Menú</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platos.map((plato) => (
            <div key={plato.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              {plato.imagen ? (
                <img src={plato.imagen} alt={plato.nombre} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-6xl">🍽️</div>
              )}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{plato.nombre}</h3>
                <p className="text-gray-600 text-sm mb-3">{plato.descripcion}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-500">S/ {plato.precio}</span>
                  <button
                    onClick={() => pedir(plato)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Pedir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {platos.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No hay platos disponibles</p>
        )}
      </div>
    );
  }

  // Vista del catálogo de restaurantes
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">
        Descubre los mejores restaurantes
      </h2>
      <p className="text-gray-600 text-center mb-8 text-lg">
        Elige un restaurante y disfruta de su menú
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantes.map((restaurante) => (
          <div
            key={restaurante.id}
            onClick={() => verMenu(restaurante)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden cursor-pointer"
          >
            <div className="h-48 overflow-hidden bg-gray-200">
              {restaurante.logo ? (
                <img src={restaurante.logo} alt={restaurante.nombre} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-6xl">🏪</div>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{restaurante.nombre}</h3>
              <p className="text-gray-600 text-sm mb-1">📍 {restaurante.direccion}</p>
              <p className="text-gray-600 text-sm mb-4">📞 {restaurante.telefono}</p>
              <div className="bg-orange-500 text-white text-center py-2 rounded-lg font-semibold">
                Ver Menú 🍽️
              </div>
            </div>
          </div>
        ))}
      </div>

      {restaurantes.length === 0 && (
        <p className="text-center text-gray-500 text-xl mt-12">
          No hay restaurantes disponibles
        </p>
      )}
    </div>
  );
}

export default Delivery;