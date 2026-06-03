import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-2xl">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-6">
          Bienvenido a <span className="text-orange-500">DeliveryApp</span> 🚀
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Sistema completo de delivery. Descubre restaurantes, elige tus platos favoritos y haz tu pedido.
        </p>
        
        <div className="flex gap-6 justify-center flex-wrap">
          <Link 
            to="/delivery" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 flex items-center gap-2"
          >
            🛵 Hacer Pedido
          </Link>
          <Link 
            to="/restaurantes" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 flex items-center gap-2"
          >
            ⚙️ Admin Restaurantes
          </Link>
          <Link 
            to="/platos" 
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 flex items-center gap-2"
          >
            ⚙️ Admin Platos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;