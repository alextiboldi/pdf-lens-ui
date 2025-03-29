
'use client';

import { useState, useEffect } from 'react';
import CreateProject from '../components/CreateProject';
import ProjectCard from '../components/ProjectCard';

interface Project {
  id: string;
  name: string;
  description: string;
  datasource: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {projects.length === 0 ? (
          <CreateProject />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
