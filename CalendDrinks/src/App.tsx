import React from 'react';
import { Beer, Wine, Martini as Cocktail } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DrinkForm from './components/DrinkForm';
import Summary from './components/Summary';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600"
                >
                  <Beer className="w-6 h-6 mr-2" />
                  Registro
                </Link>
                <Link
                  to="/resumen"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600"
                >
                  <Cocktail className="w-6 h-6 mr-2" />
                  Resumen
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<DrinkForm />} />
            <Route path="/resumen" element={<Summary />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
