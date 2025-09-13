
import React from 'react';
import type { FoodItem } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import Button from './Button';

interface FoodCardProps {
  item: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { user, claimFoodItem } = useAppContext();

  const timeDiff = new Date(item.expiryDate).getTime() - new Date().getTime();
  const daysToExpire = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const getExpiryText = () => {
    if (daysToExpire < 0) return "Expired";
    if (daysToExpire === 0) return "Expires today";
    if (daysToExpire === 1) return "Expires in 1 day";
    return `Expires in ${daysToExpire} days`;
  };

  const expiryColor = daysToExpire <= 1 ? "text-red-500" : "text-gray-500";
  const isClaimed = item.status === 'claimed';
  const isPoster = user?.id === item.postedBy.id;

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ${isClaimed ? 'opacity-60' : ''}`}>
      <div className="relative">
        <img className="w-full h-56 object-cover" src={item.imageUrl} alt={item.name} />
        {isClaimed && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-2xl font-bold uppercase tracking-widest">Claimed</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className={`text-sm font-medium ${expiryColor}`}>{getExpiryText()}</p>
        </div>
        <h3 className="text-xl font-bold mb-2 truncate">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden text-ellipsis">{item.description}</p>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center">
                <img src={item.postedBy.avatarUrl} alt={item.postedBy.name} className="w-8 h-8 rounded-full mr-2"/>
                <span className="text-sm font-medium text-gray-700">by {item.postedBy.name}</span>
            </div>
            {!isClaimed && !isPoster && (
                <Button onClick={() => claimFoodItem(item.id)} disabled={!user}>Claim</Button>
            )}
            {isPoster && !isClaimed && (
                 <span className="text-xs font-semibold text-primary px-3 py-1.5 bg-green-100 rounded-full">Your Post</span>
            )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
