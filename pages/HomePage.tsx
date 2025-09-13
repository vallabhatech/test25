
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import FoodCard from '../components/FoodCard';

const HomePage: React.FC = () => {
  const { foodItems } = useAppContext();
  
  const availableItems = foodItems.filter(item => item.status === 'available');
  const claimedItems = foodItems.filter(item => item.status === 'claimed');

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Food</h1>
        <p className="text-lg text-gray-600">Claim an item to help reduce food waste in your community.</p>
        {availableItems.length > 0 ? (
          <div className="mt-6 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {availableItems.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-6 text-center py-12 bg-gray-100 rounded-lg">
            <p className="text-gray-500">No available food items right now. Why not post something?</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Recently Claimed</h2>
         {claimedItems.length > 0 ? (
          <div className="mt-6 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {claimedItems.slice(0, 4).map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
             <div className="mt-6 text-center py-12 bg-gray-100 rounded-lg">
                <p className="text-gray-500">No items have been claimed yet.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
