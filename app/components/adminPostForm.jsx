'use client';

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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Post'}
        </button>
        {errors.submit && <p className="text-red-500 text-sm mt-2">{errors.submit}</p>}
      </div>
    </form>
  );
};

export default AdminPostForm;
