
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export type FoodItemStatus = 'available' | 'claimed';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  expiryDate: string; // ISO string format
  postedBy: User;
  claimedBy: User | null;
  status: FoodItemStatus;
}

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  message: string;
  type: NotificationType;
}

export interface AppContextType {
  user: User | null;
  foodItems: FoodItem[];
  notification: Notification | null;
  login: (name: string) => void;
  logout: () => void;
  addFoodItem: (item: Omit<FoodItem, 'id' | 'postedBy' | 'claimedBy' | 'status'>) => void;
  claimFoodItem: (itemId: string) => void;
  showNotification: (notification: Notification) => void;
}
