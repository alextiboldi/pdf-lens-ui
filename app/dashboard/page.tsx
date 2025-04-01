import ProjectWizard from "@/components/project-wizard";

export default function DashboardPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <ProjectWizard />
    </main>
  );
}
