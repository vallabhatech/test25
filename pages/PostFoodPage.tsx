
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';

const PostFoodPage: React.FC = () => {
  const { addFoodItem } = useAppContext();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [expiryDays, setExpiryDays] = useState('3');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + parseInt(expiryDays, 10));

    addFoodItem({
      name,
      description,
      expiryDate: expiryDate.toISOString(),
      // Using a random image from picsum as a placeholder for actual upload
      imageUrl: imagePreview || `https://picsum.photos/seed/${Date.now()}/600/400`,
    });
    
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Post a New Food Item</h1>
      <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <Input id="name" label="Food Name" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g., Fresh Loaf of Bread" />
        <Textarea id="description" label="Description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} placeholder="e.g., Baked this morning, have an extra one!"/>
        <Input id="expiry" label="Expires in (days)" type="number" value={expiryDays} onChange={e => setExpiryDays(e.target.value)} required min="0"/>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="mx-auto h-48 w-auto rounded-md"/>
                    ) : (
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-focus focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*"/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
        </div>
        
        <Button type="submit" className="w-full" size="lg">Post Item</Button>
      </form>
    </div>
  );
};

export default PostFoodPage;
