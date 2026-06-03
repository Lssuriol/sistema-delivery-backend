import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🍔</span>
            <span className="text-white text-2xl font-bold tracking-wider">
              DeliveryApp
            </span>
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/delivery" 
              className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition duration-300 font-medium"
            >
              🛵 Delivery
            </Link>
            <Link 
              to="/restaurantes" 
              className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition duration-300 font-medium"
            >
              ⚙️ Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;