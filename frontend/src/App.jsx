import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Restaurantes from './pages/Restaurantes';
import Platos from './pages/Platos';
import Delivery from './pages/Delivery';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurantes" element={<Restaurantes />} />
            <Route path="/platos" element={<Platos />} />
            <Route path="/delivery" element={<Delivery />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;