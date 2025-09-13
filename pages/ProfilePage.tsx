
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import FoodCard from '../components/FoodCard';

const ProfilePage: React.FC = () => {
  const { user, foodItems } = useAppContext();

  if (!user) {
    return null; // Should be redirected by router anyway
  }

  const myPosts = foodItems.filter(item => item.postedBy.id === user.id);
  const myClaims = foodItems.filter(item => item.claimedBy?.id === user.id);

  return (
    <div className="space-y-12">
      <div className="flex items-center space-x-6 p-6 bg-white rounded-xl shadow-md">
        <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full border-4 border-primary"/>
        <div>
            <h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 mt-1">Community Member</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Posts ({myPosts.length})</h2>
        {myPosts.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {myPosts.map(item => <FoodCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-100 rounded-lg">
            <p className="text-gray-500">You haven't posted any food items yet.</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Claims ({myClaims.length})</h2>
        {myClaims.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {myClaims.map(item => <FoodCard key={item.id} item={item} />)}
          </div>
        ) : (
           <div className="text-center py-12 bg-gray-100 rounded-lg">
            <p className="text-gray-500">You haven't claimed any food items yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
