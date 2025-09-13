
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { AppContextType, User, FoodItem, Notification } from '../types';
import { MOCK_FOOD_ITEMS, MOCK_USERS } from '../constants';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>(MOCK_FOOD_ITEMS);
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = useCallback((newNotification: Notification) => {
    setNotification(newNotification);
  }, []);

  const login = (name: string) => {
    // This is a mock login. In a real app, this would be an API call.
    const mockUserKey = `user${(Object.keys(MOCK_USERS).length % 3) + 1}`;
    const loggedInUser = { ...MOCK_USERS[mockUserKey], name };
    setUser(loggedInUser);
    showNotification({ message: `Welcome back, ${name}!`, type: 'success' });
  };

  const logout = () => {
    setUser(null);
    showNotification({ message: 'You have been logged out.', type: 'info' });
  };

  const addFoodItem = (item: Omit<FoodItem, 'id' | 'postedBy' | 'claimedBy' | 'status'>) => {
    if (!user) return;
    const newItem: FoodItem = {
      ...item,
      id: `f${Date.now()}`,
      postedBy: user,
      claimedBy: null,
      status: 'available',
    };
    setFoodItems(prevItems => [newItem, ...prevItems]);
    showNotification({ message: 'Food item posted successfully!', type: 'success' });
  };

  const claimFoodItem = (itemId: string) => {
    if (!user) {
        showNotification({ message: 'You must be logged in to claim items.', type: 'error' });
        return;
    }

    setFoodItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId && item.status === 'available') {
          // Simulate notification to the poster
          console.log(`Simulating notification to ${item.postedBy.name}: Your item "${item.name}" was claimed by ${user.name}.`);
          showNotification({ message: 'Item claimed! The poster has been notified.', type: 'success' });
          return { ...item, status: 'claimed', claimedBy: user };
        }
        return item;
      })
    );
  };

  const value = {
    user,
    foodItems,
    notification,
    login,
    logout,
    addFoodItem,
    claimFoodItem,
    showNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
