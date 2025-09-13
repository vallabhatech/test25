
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Join ShareBite
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your name to start sharing and claiming food.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              id="name"
              label="Your Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Jane Doe"
            />
          </div>
          <div>
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </div>
          <p className="text-xs text-center text-gray-500">
            This is a demo. No password or email is required.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
