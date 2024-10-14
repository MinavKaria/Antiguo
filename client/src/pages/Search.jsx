import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { clothingData } from '../data/ClothingData';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const fuse = new Fuse(clothingData, {
    keys: ['name', 'category'], 
    threshold: 0.4,
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const fuseResults = fuse.search(value);
      setResults(fuseResults.map((result) => result.item));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-200">
      <div className="max-w-2xl w-full mt-16 px-4 ">
        
        <input
          type="text"
          placeholder="Search for clothes..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-4 mb-8 border border-transparent rounded-lg shadow-lg text-gray-700 bg-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
        />

        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {results.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-md"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-500">{item.category}</p>
                  <p className="text-indigo-600 font-bold mt-2">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && searchTerm && (
          <div className="text-center mt-10">
            <p className="text-lg text-gray-500">No results found for "{searchTerm}"</p>
            <img
              src="https://source.unsplash.com/400x300/?sad"
              alt="No results"
              className="mx-auto mt-4 rounded-lg shadow-lg w-64"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
