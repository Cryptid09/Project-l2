"use client";

import { useState } from 'react';
import { addPost } from '@/lib/action';
import { useFormState } from 'react-dom';

const AdminPostForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    img: '',
    desc: '',
    userId: userId,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [state, formAction] = useFormState(addPost, undefined);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, img: file.name });
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.slug) newErrors.slug = 'Slug is required';
    if (!formData.desc) newErrors.desc = 'Description is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const postData = new FormData();
      postData.append('title', formData.title);
      postData.append('slug', formData.slug);
      postData.append('desc', formData.desc);
      postData.append('userId', formData.userId);
      if (imageFile) {
        postData.append('img', imageFile);
      }

      await formAction(postData);
      setFormData({
        title: '',
        slug: '',
        img: '',
        desc: '',
        userId: userId,
      });
      setImagePreview(null);
      setErrors({});
    } catch (error) {
      console.error(error);
      setErrors({ submit: 'Failed to add post' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-[#242422] rounded-lg">
      <h1 className="text-2xl text-white font-bold mb-4">Add New Post</h1>
      <div className="grid gap-4">
        <input type="hidden" name="userId" value={userId} />
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>
        <div>
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
        </div>
        <div>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2 rounded" />}
        </div>
        <div>
          <textarea
            name="desc"
            placeholder="Description"
            rows={6}
            value={formData.desc}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.desc && <p className="text-red-500 text-sm">{errors.desc}</p>}
        </div>
     <button type="submit" disabled={isSubmitting} className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
          <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
            {isSubmitting ? 'Adding...' : 'Add'}
          </span>
        </button>
    
        {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      </div>
    </form>
  );
};

export default AdminPostForm;
