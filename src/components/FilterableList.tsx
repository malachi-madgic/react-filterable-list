import React, { useState, useEffect } from 'react';

interface Item {
  id: string;
  name: string;
  description: string;
}

interface FilterableListProps {
  items: Item[];
}

const FilterableList: React.FC<FilterableListProps> = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const newFilteredItems = items.filter(item =>
      item.name.toLowerCase().includes(lowercasedSearchTerm) ||
      item.description.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredItems(newFilteredItems);
  }, [searchTerm, items]); // Re-run effect when searchTerm or items prop changes

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Filterable List</h2>
      <input
        type="text"
        placeholder="Search by name or description..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      />
      {filteredItems.length === 0 && searchTerm !== '' ? (
        <p>No matching items found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredItems.map(item => (
            <li
              key={item.id}
              style={{
                background: '#f9f9f9',
                border: '1px solid #eee',
                marginBottom: '10px',
                padding: '15px',
                borderRadius: '5px'
              }}
            >
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterableList;

/*
Usage Example:

import React from 'react';
import FilterableList from './FilterableList'; // Adjust path as needed

const App: React.FC = () => {
  const sampleItems = [
    { id: '1', name: 'Apple', description: 'A common fruit, typically round with red or green skin.' },
    { id: '2', name: 'Banana', description: 'A long curved fruit which grows in clusters and has soft pulpy flesh and yellow skin when ripe.' },
    { id: '3', name: 'Orange', description: 'A round juicy citrus fruit with a tough bright reddish-yellow rind.' },
    { id: '4', name: 'Grape', description: 'A berry, typically green, purple, red, or black, growing in clusters on a vine, eaten as fruit, and used in making wine.' },
    { id: '5', name: 'Pineapple', description: 'A large juicy tropical fruit consisting of aromatic edible yellow flesh surrounded by a tough, spiky rind.' },
  ];

  return (
    <div>
      <h1>My Application</h1>
      <FilterableList items={sampleItems} />
    </div>
  );
};

export default App;
*/