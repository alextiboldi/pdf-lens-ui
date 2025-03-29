
interface Project {
  id: string;
  name: string;
  description: string;
  datasource: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Data Source: {project.datasource}
      </div>
    </div>
  );
}
