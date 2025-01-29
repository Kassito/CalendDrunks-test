import React, { useState } from 'react';
import { Beer, Wine, Martini as Cocktail } from 'lucide-react';

interface BeerBrand {
  name: string;
  graduation: number;
}

interface SpiritBrand {
  name: string;
  graduation: number;
}

interface FormData {
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

const DrinkForm = () => {
  const [formData, setFormData] = useState<FormData>({
    date: new Date().toISOString().split('T')[0],
    drinkType: '',
    quantity: 1,
    size: 'tercio',
    price: 0,
  });

  // Base de datos simulada de cervezas
  const beerBrands: Record<string, BeerBrand[]> = {
    rubia: [
      { name: 'Mahou Clásica', graduation: 4.8 },
      { name: 'Mahou 5 Estrellas', graduation: 5.5 },
      { name: 'Estrella Galicia', graduation: 5.5 },
      { name: 'Estrella Damm', graduation: 5.4 },
      { name: 'Amstel', graduation: 5.0 },
      { name: 'Heineken', graduation: 5.0 },
      { name: 'Cruzcampo', graduation: 4.8 },
      { name: 'Victoria', graduation: 4.8 },
      { name: 'Ambar', graduation: 4.8 },
      { name: 'Paulaner', graduation: 4.9 },
      { name: 'Otra', graduation: 0 },
    ],
    tostada: [
      { name: 'Estrella Galicia 1906', graduation: 6.5 },
      { name: 'Alhambra Reserva', graduation: 6.4 },
      { name: 'Ambar Export', graduation: 7.0 },
      { name: 'Otra', graduation: 0 },
    ],
    negra: [
      { name: 'Guinness', graduation: 4.2 },
      { name: 'Mahou Negra', graduation: 5.5 },
      { name: 'Otra', graduation: 0 },
    ],
    IPA: [
      { name: 'Lagunitas IPA', graduation: 6.2 },
      { name: 'BrewDog Punk IPA', graduation: 5.6 },
      { name: 'Otra', graduation: 0 },
    ],
    artesanal: [
      { name: 'La Virgen', graduation: 5.0 },
      { name: 'Malasaña Brewing', graduation: 5.5 },
      { name: 'Otra', graduation: 0 },
    ],
    APA: [
      { name: 'Sierra Nevada Pale Ale', graduation: 5.6 },
      { name: 'Goose Island', graduation: 5.5 },
      { name: 'Otra', graduation: 0 },
    ],
  };

  const wineTypes = [
    'Tinto',
    'Blanco',
    'Rosado',
    'Espumoso',
    'Sidra',
    'Cava',
  ];

  const spirits: Record<string, SpiritBrand[]> = {
    ron: [
      { name: 'Bacardi', graduation: 37.5 },
      { name: 'Brugal', graduation: 38 },
      { name: 'Havana Club', graduation: 40 },
      { name: 'Otra', graduation: 0 },
    ],
    vodka: [
      { name: 'Absolut', graduation: 40 },
      { name: 'Smirnoff', graduation: 37.5 },
      { name: 'Grey Goose', graduation: 40 },
      { name: 'Otra', graduation: 0 },
    ],
    gin: [
      { name: 'Beefeater', graduation: 40 },
      { name: 'Tanqueray', graduation: 43.1 },
      { name: 'Larios', graduation: 37.5 },
      { name: 'Seagram\'s', graduation: 40 },
      { name: 'Otra', graduation: 0 },
    ],
    tequila: [
      { name: 'TequiFresa', graduation: 18 },
      { name: 'TequiMango', graduation: 18 },
      { name: 'TequiMelon', graduation: 18 },
      { name: 'Don Julio', graduation: 38 },
      { name: 'Jose Cuervo', graduation: 38 },
      { name: 'Otra', graduation: 0 },
    ],
    cremaOrujo: [
      { name: 'Ruavieja', graduation: 17 },
      { name: 'Panizo', graduation: 17 },
      { name: 'Otra', graduation: 0 },
    ],
    whisky: [
      { name: 'JB', graduation: 40 },
      { name: 'Ballantine\'s', graduation: 40 },
      { name: 'Jack Daniel\'s', graduation: 40 },
      { name: 'Otra', graduation: 0 },
    ],
  };

  const mixers = [
    'Coca-Cola',
    'Fanta Naranja',
    'Fanta Limón',
    'Sprite',
    'Tónica',
    'Red Bull',
    'Zumo',
    'Otro',
  ];

  const handleBeerBrandChange = (brand: string) => {
    const beerType = formData.beerType || '';
    const selectedBeer = beerBrands[beerType]?.find(b => b.name === brand);

    if (brand === 'Otra') {
      setFormData({
        ...formData,
        beerBrand: '',
        customBrand: '',
        graduation: 0,
      });
    } else {
      setFormData({
        ...formData,
        beerBrand: brand,
        customBrand: undefined,
        graduation: selectedBeer?.graduation || 0,
      });
    }
  };

  const handleSpiritBrandChange = (brand: string) => {
    const spiritType = formData.spiritType || '';
    const selectedSpirit = spirits[spiritType]?.find(s => s.name === brand);

    if (brand === 'Otra') {
      setFormData({
        ...formData,
        spiritBrand: '',
        customBrand: '',
        graduation: 0,
      });
    } else {
      setFormData({
        ...formData,
        spiritBrand: brand,
        customBrand: undefined,
        graduation: selectedSpirit?.graduation || 0,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem('drinkLog') || '[]');
    localStorage.setItem('drinkLog', JSON.stringify([...existingData, formData]));
    alert('Bebida registrada con éxito!');
    setFormData({
      ...formData,
      drinkType: '',
      beerType: '',
      beerBrand: '',
      wineType: '',
      spiritType: '',
      spiritBrand: '',
      mixer: '',
      customBrand: '',
      graduation: 0,
      quantity: 1,
      size: 'tercio',
      customSize: '',
      price: 0,
    });
  };

  const getDrinkSizes = () => {
    switch (formData.drinkType) {
      case 'cerveza':
        return (
          <>
            <option value="botellin">Botellín (0,2L)</option>
            <option value="tercio">Tercio (0,33L)</option>
            <option value="doble">Doble (0,33L)</option>
            <option value="jarra">Jarra (0,5L)</option>
            <option value="mini">Mini (1L)</option>
            <option value="otro">Otro</option>
          </>
        );
      case 'vino':
        return <option value="copa">Copa (0,15L)</option>;
      case 'cocktail':
        return (
          <>
            <option value="sidra">Sidra (0,15L)</option>
            <option value="tubo">Tubo (0,1L)</option>
            <option value="mini">Mini (0,4L)</option>
            <option value="copa">Copa (0,2L)</option>
            <option value="chupito">Chupito (0,05L)</option>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Registrar Bebida</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div lang='es'>
          <label className="block text-sm font-medium text-gray-700">Fecha</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Bebida</label>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, drinkType: 'cerveza' })}
              className={`p-4 rounded-lg flex flex-col items-center ${
                formData.drinkType === 'cerveza' ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-50'
              }`}
            >
              <Beer className="w-8 h-8 mb-2" />
              <span>Cerveza</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, drinkType: 'vino' })}
              className={`p-4 rounded-lg flex flex-col items-center ${
                formData.drinkType === 'vino' ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-50'
              }`}
            >
              <Wine className="w-8 h-8 mb-2" />
              <span>Vino</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, drinkType: 'cocktail' })}
              className={`p-4 rounded-lg flex flex-col items-center ${
                formData.drinkType === 'cocktail' ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-50'
              }`}
            >
              <Cocktail className="w-8 h-8 mb-2" />
              <span>Cocktail</span>
            </button>
          </div>
        </div>

        {formData.drinkType === 'cerveza' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de Cerveza</label>
              <select
                value={formData.beerType || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  beerType: e.target.value,
                  beerBrand: '',
                  graduation: 0
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecciona un tipo</option>
                <option value="rubia">Rubia</option>
                <option value="tostada">Tostada</option>
                <option value="negra">Negra</option>
                <option value="IPA">IPA</option>
                <option value="artesanal">Artesanal</option>
                <option value="APA">APA</option>
              </select>
            </div>

            {formData.beerType && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Marca</label>
                <select
                  value={formData.beerBrand || ''}
                  onChange={(e) => handleBeerBrandChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Selecciona una marca</option>
                  {beerBrands[formData.beerType]?.map((beer) => (
                    <option key={beer.name} value={beer.name}>
                      {beer.name} {beer.graduation > 0 ? `(${beer.graduation}%)` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {formData.beerBrand === 'Otra' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre de la cerveza</label>
                  <input
                    type="text"
                    value={formData.customBrand || ''}
                    onChange={(e) => setFormData({ ...formData, customBrand: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Nombre de la cerveza"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Graduación (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={formData.graduation || ''}
                    onChange={(e) => setFormData({ ...formData, graduation: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </>
            )}
          </>
        )}

        {formData.drinkType === 'vino' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de Vino</label>
              <select
                value={formData.wineType || ''}
                onChange={(e) => setFormData({ ...formData, wineType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecciona un tipo</option>
                {wineTypes.map((type) => (
                  <option key={type} value={type.toLowerCase()}>{type}</option>
                ))}
              </select>
            </div>
            {formData.wineType && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre del vino</label>
                  <input
                    type="text"
                    value={formData.customBrand || ''}
                    onChange={(e) => setFormData({ ...formData, customBrand: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Nombre del vino"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Graduación (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={formData.graduation || ''}
                    onChange={(e) => setFormData({ ...formData, graduation: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </>
            )}
          </>
        )}

        {formData.drinkType === 'cocktail' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de Alcohol</label>
              <select
                value={formData.spiritType || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  spiritType: e.target.value,
                  spiritBrand: '',
                  graduation: 0
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecciona un tipo</option>
                <option value="ron">Ron</option>
                <option value="vodka">Vodka</option>
                <option value="gin">Gin</option>
                <option value="whisky">Whisky</option>
                <option value="tequila">Tequila</option>
                <option value="cremaOrujo">Crema de orujo</option>
              </select>
            </div>

            {formData.spiritType && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Marca</label>
                  <select
                    value={formData.spiritBrand || ''}
                    onChange={(e) => handleSpiritBrandChange(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Selecciona una marca</option>
                    {spirits[formData.spiritType]?.map((spirit) => (
                      <option key={spirit.name} value={spirit.name}>
                        {spirit.name} {spirit.graduation > 0 ? `(${spirit.graduation}%)` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.spiritBrand === 'Otra' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre de la marca</label>
                      <input
                        type="text"
                        value={formData.customBrand || ''}
                        onChange={(e) => setFormData({ ...formData, customBrand: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Nombre de la marca"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Graduación (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={formData.graduation || ''}
                        onChange={(e) => setFormData({ ...formData, graduation: parseFloat(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mezcla</label>
                  <select
                    value={formData.mixer || ''}
                    onChange={(e) => setFormData({ ...formData, mixer: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Selecciona una mezcla</option>
                    {mixers.map((mixer) => (
                      <option key={mixer} value={mixer.toLowerCase()}>{mixer}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </>
        )}

        {formData.drinkType && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cantidad</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tamaño</label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {getDrinkSizes()}
              </select>
            </div>

            {formData.size === 'otro' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Tamaño personalizado (L)</label>
                <input
                  type="text"
                  value={formData.customSize || ''}
                  onChange={(e) => setFormData({ ...formData, customSize: e.target.value })}
                  placeholder="Ej: 0.75"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Precio (€)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={!formData.drinkType}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
          Registrar Bebida
        </button>
      </form>
    </div>
  );
};

export default DrinkForm;
