
import React from 'react';
import type { NotificationType } from '../types';

interface NotificationProps {
  message: string;
  type: NotificationType;
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`fixed bottom-5 right-5 p-4 rounded-lg text-white shadow-xl transform animate-bounce-in ${typeClasses[type]}`}>
      {message}
    </div>
  );
};

export default Notification;
