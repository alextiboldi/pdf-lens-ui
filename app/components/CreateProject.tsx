
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GoogleDriveSelector from './GoogleDriveSelector';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from 'next/image';

const dataSources = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    icon: '/globe.svg',
    active: true,
    description: 'Connect and manage your Google Drive files'
  },
  {
    id: 'google-bucket',
    name: 'Google Bucket',
    icon: '/window.svg',
    active: false,
    description: 'Store and retrieve files from Google Cloud Storage'
  },
  {
    id: 'aws-s3',
    name: 'AWS S3',
    icon: '/file.svg',
    active: false,
    description: 'Leverage Amazon S3 for file storage'
  }
];

export default function CreateProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');

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
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Create New Project</CardTitle>
          <CardDescription>
            Set up a new project and connect your preferred data source
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </FormControl>
            </FormItem>

            <div className="space-y-4">
              <FormLabel>Select Data Source</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dataSources.map((source) => (
                  <Card
                    key={source.id}
                    className={`cursor-pointer transition-all ${
                      !source.active && 'opacity-50'
                    } ${
                      selectedSource === source.id
                        ? 'border-blue-500 shadow-lg'
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => source.active && setSelectedSource(source.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <Image
                        src={source.icon}
                        alt={source.name}
                        width={40}
                        height={40}
                        className="mx-auto mb-4"
                      />
                      <h3 className="font-semibold mb-2">{source.name}</h3>
                      <p className="text-sm text-gray-500">{source.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedSource === 'google-drive' && (
              <div className="mt-6">
                <GoogleDriveSelector />
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
            >
              Create Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
