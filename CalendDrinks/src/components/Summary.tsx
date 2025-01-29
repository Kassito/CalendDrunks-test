import React, { useEffect, useState } from 'react';
import { Beer, Wine, Martini as Cocktail , Trash2, ChevronLeft, ChevronRight} from 'lucide-react';
// pencil para el editar
// import { useNavigate } from 'react-router-dom';

interface DrinkLog {
  id?: string;
  date: string;
  drinkType: string;
  beerType?: string;
  beerBrand?: string;
  wineType?: string;
  spiritType?: string;
  spiritBrand?: string;
  mixer?: string;
  customBrand?: string;
  graduation?: number;
  quantity: number;
  size: string;
  customSize?: string;
  price: number;
}

const Summary = () => {
  const [drinks, setDrinks] = useState<DrinkLog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const itemsPerPage = 10;
  // const navigate = useNavigate();

  useEffect(() => {
    const storedDrinks = JSON.parse(localStorage.getItem('drinkLog') || '[]');
    // Ensure each drink has an ID
    const drinksWithIds = storedDrinks.map((drink: DrinkLog) => ({
      ...drink,
      id: drink.id || crypto.randomUUID()
    }));
    setDrinks(drinksWithIds);
    localStorage.setItem('drinkLog', JSON.stringify(drinksWithIds));
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta bebida?')) {
      const updatedDrinks = drinks.filter(drink => drink.id !== id);
      setDrinks(updatedDrinks);
      localStorage.setItem('drinkLog', JSON.stringify(updatedDrinks));
    }
  };

  // const handleEdit = (drink: DrinkLog) => {
  //   localStorage.setItem('editDrink', JSON.stringify(drink));
  //   navigate('/?edit=true');
  // };

  const getIcon = (type: string) => {
    switch (type) {
      case 'cerveza':
        return <Beer className="w-6 h-6" />;
      case 'vino':
        return <Wine className="w-6 h-6" />;
      case 'cocktail':
        return <Cocktail className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getTotalByType = (type: string) => {
    return filteredDrinks
      .filter(drink => drink.drinkType === type)
      .reduce((total, drink) => total + drink.quantity, 0);
  };

   const getTotalSpent = () => {
    return filteredDrinks.reduce((total, drink) => total + (drink.price * drink.quantity), 0);
  };

  const getTotalLiters = (type: string) => {
    return filteredDrinks
      .filter(drink => drink.drinkType === type)
      .reduce((total, drink) => {
        const sizes: Record<string, number> = {
          botellin: 0.2,
          tercio: 0.33,
          doble: 0.33,
          jarra: 0.5,
          mini: type === 'cerveza' ? 1 : 0.4,
          copa: type === 'vino' ? 0.15 : 0.2,
          sidra: 0.15,
          tubo: 0.1,
          chupito: 0.05
        };

        const liters = drink.size === 'otro' && drink.customSize
          ? parseFloat(drink.customSize)
          : sizes[drink.size] || 0;

        return total + (liters * drink.quantity);
      }, 0);
  };

  const formatSize = (drink: DrinkLog) => {
    if (drink.size === 'otro' && drink.customSize) {
      return `${drink.customSize}L`;
    }
    const sizes: Record<string, string> = {
      botellin: '0,2L',
      tercio: '0,33L',
      doble: '0,33L',
      jarra: '0,5L',
      mini: drink.drinkType === 'cerveza' ? '1L' : '0,4L',
      copa: drink.drinkType === 'vino' ? '0,15L' : '0,2L',
      sidra: '0,15L',
      tubo: '0,1L',
      chupito: '0,05L'
    };
    return sizes[drink.size] || drink.size;
  };

  const getDrinkDetails = (drink: DrinkLog) => {
    switch (drink.drinkType) {
      case 'cerveza':
        if (drink.graduation == 0) {
          return `${drink.beerType?.substring(0, 1).toUpperCase()}${drink.beerType?.substring(1,drink.beerType.length).toLowerCase()}`;
        }
        if(drink.customBrand == undefined && drink.beerBrand == undefined){
          return "Sin datos";
        }
        return `${drink.customBrand || drink.beerBrand} (${drink.graduation}%)`;
      case 'vino':
        if (drink.customBrand == undefined && drink.graduation == undefined) {
          return `${drink.wineType?.substring(0, 1).toUpperCase()}${drink.wineType?.substring(1,drink.wineType.length).toLowerCase()}`;
        }else if(drink.graduation == undefined){
          return `${drink.wineType?.substring(0, 1).toUpperCase()}${drink.wineType?.substring(1,drink.wineType.length).toLowerCase()} - ${drink.customBrand}`;
        }
        return `${drink.wineType?.substring(0, 1).toUpperCase()}${drink.wineType?.substring(1,drink.wineType.length).toLowerCase()} - ${drink.customBrand} (${drink.graduation}%)`;
      case 'cocktail':
        if (drink.mixer == undefined) {
          if (drink.customBrand == undefined || drink.spiritBrand == undefined) {
            return `${drink.spiritType?.substring(0, 1).toUpperCase()}${drink.spiritType?.substring(1,drink.spiritType.length).toLowerCase()}`;
          }else if(drink.graduation == undefined){
            return `${drink.spiritType?.substring(0, 1).toUpperCase()}${drink.spiritType?.substring(1,drink.spiritType.length).toLowerCase()} - ${drink.customBrand || drink.spiritBrand}`;
          }
        }else{
          if (drink.customBrand == undefined || drink.spiritBrand == undefined) {
            return `${drink.spiritType?.substring(0, 1).toUpperCase()}${drink.spiritType?.substring(1,drink.spiritType.length).toLowerCase()} + ${drink.mixer?.substring(0, 1).toUpperCase()}${drink.mixer?.substring(1,drink.mixer.length).toLowerCase()}`;
          }else if(drink.graduation == undefined){
            return `${drink.spiritType?.substring(0, 1).toUpperCase()}${drink.spiritType?.substring(1,drink.spiritType.length).toLowerCase()} - ${drink.customBrand || drink.spiritBrand} + ${drink.mixer?.substring(0, 1).toUpperCase()}${drink.mixer?.substring(1,drink.mixer.length).toLowerCase()}`;
          }
        }
        return `${drink.spiritType?.substring(0, 1).toUpperCase()}${drink.spiritType?.substring(1,drink.spiritType.length).toLowerCase()} - ${drink.customBrand || drink.spiritBrand} (${drink.graduation}%) + ${drink.mixer?.substring(0, 1).toUpperCase()}${drink.mixer?.substring(1,drink.mixer.length).toLowerCase()}`;
      default:
        return '';
    }
  };

  const months = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' }
  ];

  const filteredDrinks = drinks.filter(drink => {
    if (selectedMonth === 'all') return true;
    return drink.date.split('-')[1] === selectedMonth;
  });

  const totalPages = Math.ceil(filteredDrinks.length / itemsPerPage);
  const paginatedDrinks = filteredDrinks
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Resumen Anual</h2>
            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">Todos los meses</option>
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Beer className="w-6 h-6 mr-2" />
                <span className="font-medium">Cervezas</span>
              </div>
              <p className="text-2xl font-bold">{getTotalByType('cerveza')}</p>
              <p className="text-sm text-gray-600">{getTotalLiters('cerveza').toFixed(2)}L</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Wine className="w-6 h-6 mr-2" />
                <span className="font-medium">Vinos</span>
              </div>
              <p className="text-2xl font-bold">{getTotalByType('vino')}</p>
              <p className="text-sm text-gray-600">{getTotalLiters('vino').toFixed(2)}L</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Cocktail className="w-6 h-6 mr-2" />
                <span className="font-medium">Cocktails</span>
              </div>
              <p className="text-2xl font-bold">{getTotalByType('cocktail')}</p>
              <p className="text-sm text-gray-600">{getTotalLiters('cocktail').toFixed(2)}L</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="font-medium">Gasto Total</span>
              </div>
              <p className="text-2xl font-bold">{getTotalSpent().toFixed(2)}€</p>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold mb-4">Historial de Bebidas</h3>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño</th>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedDrinks.map((drink) => (
                    <tr key={drink.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{drink.date}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          {getIcon(drink.drinkType)}
                          <span className="ml-2 capitalize">{drink.drinkType}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                        {getDrinkDetails(drink)}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{drink.quantity}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{formatSize(drink)}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{(drink.price * drink.quantity).toFixed(2)}€</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          {/* <button
                            onClick={() => handleEdit(drink)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Editar"
                          >
                            <Pencil className="w-5 h-5" />
                          </button> */}
                          <button
                            onClick={() => handleDelete(drink.id!)}
                            className="text-red-600 hover:text-red-900"
                            title="Eliminar"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4 gap-4">
              <div className="flex justify-between w-full sm:hidden">
                <button
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, filteredDrinks.length)}
                    </span>{' '}
                    de <span className="font-medium">{filteredDrinks.length}</span> resultados
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Anterior</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Siguiente</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default Summary;
