
'use client';

import { useState } from 'react';
import Image from 'next/image';
import GoogleDriveSelector from './GoogleDriveSelector';

const dataSources = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    icon: '/globe.svg',
    active: true
  },
  {
    id: 'google-bucket',
    name: 'Google Bucket',
    icon: '/window.svg',
    active: false
  },
  {
    id: 'aws-s3',
    name: 'AWS S3',
    icon: '/file.svg',
    active: false
  }
];

export default function CreateProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSource, setSelectedSource] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          datasource: selectedSource,
          folderId: selectedFolder
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      window.location.reload();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Select Data Source</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {dataSources.map((source) => (
              <button
                key={source.id}
                type="button"
                disabled={!source.active}
                onClick={() => setSelectedSource(source.id)}
                className={`p-4 border rounded-lg text-center ${
                  source.active ? 'hover:border-blue-500' : 'opacity-50 cursor-not-allowed'
                } ${selectedSource === source.id ? 'border-blue-500' : ''}`}
              >
                <Image
                  src={source.icon}
                  alt={source.name}
                  width={40}
                  height={40}
                  className="mx-auto mb-2"
                />
                <span className="block text-sm">{source.name}</span>
              </button>
            ))}
          </div>
        </div>
        {selectedSource === 'google-drive' && (
          <div className="mt-6">
            <GoogleDriveSelector />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}
