// src/components/PostForm.tsx
// biome-ignore lint/style/useImportType: <explanation>
import React from 'react';
import { useState, useCallback } from 'react';
import { z } from 'zod';
import { postSchema } from '../schemas/post';
import type { PostFormData } from '../schemas/post';

const initialFormData: PostFormData = {
  title: '',
  sub_title: '',
  published: false,
  description: '',
};

export default function PostForm() {
  const [formData, setFormData] = useState<PostFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = event.target;
      const updatedValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
    },
    []
  );

  const validateForm = (data: PostFormData): boolean => {
    try {
      postSchema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as Record<string, string>);
  
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm(formData)) return;

    console.log('formData', formData);

    // try {
    //   const response = await fetch('/api/posts', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     setResponseMessage('Post created successfully!');
    //     setFormData(initialFormData); // Reset form
    //   } else {
    //     const errorData = await response.json();
    //     setResponseMessage(`Error: ${errorData.message || 'Failed to create post'}`);
    //   }
    // } catch (error) {
    //   setResponseMessage('An unexpected error occurred.');
    // }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={submitForm} noValidate>
        <FormField
          label="Title"
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
          error={errors.title}
          required
        />

        <FormField
          label="Subtitle"
          id="sub_title"
          name="sub_title"
          type="text"
          value={formData.sub_title || ''}
          onChange={handleInputChange}
          error={errors.sub_title}
        />

        <div>
          <label htmlFor="published">Published:</label>
          <input
            id="published"
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleInputChange}
          />
        </div>

        <FormField
          label="Description"
          id="description"
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleInputChange}
          error={errors.description}
          required
        />

        <button type="submit">Create Post</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

// Reusable FormField component
interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type: 'text' | 'textarea';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
}

function FormField({ label, id, name, type, value, onChange, error, required }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      {type === 'textarea' ? (
        <textarea id={id} name={name} value={value} onChange={onChange} required={required} />
      ) : (
        <input id={id} type={type} name={name} value={value} onChange={onChange} required={required} />
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
