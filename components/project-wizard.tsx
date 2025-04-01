"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProjectDetailsStep from "./wizard-steps/project-details-step";
import FolderSelectionStep from "./wizard-steps/folder-selection-step";
import WizardSteps from "./wizard-steps/wizard-steps";

export type DataSource = "google-drive" | "google-bucket" | "aws-s3";

export interface ProjectDetails {
  name: string;
  description: string;
  dataSource: DataSource | null;
}

export default function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    name: "",
    description: "",
    dataSource: null,
  });
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const steps = ["Project Details", "Select Folder"];

  const handleProjectDetailsSubmit = (details: ProjectDetails) => {
    setProjectDetails(details);
    setCurrentStep(1);
  };

  const handleBack = () => {
    setCurrentStep(0);
    setSelectedFolder(null);
  };

  const handleComplete = () => {
    // Here you would typically submit the project data to your backend
    console.log("Project created:", {
      ...projectDetails,
      folder: selectedFolder,
    });
    // Reset the form
    setProjectDetails({
      name: "",
      description: "",
      dataSource: null,
    });
    setSelectedFolder(null);
    setCurrentStep(0);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="pt-6">
        <WizardSteps steps={steps} currentStep={currentStep} />

        {currentStep === 0 && (
          <ProjectDetailsStep
            initialValues={projectDetails}
            onSubmit={handleProjectDetailsSubmit}
          />
        )}

        {currentStep === 1 && (
          <FolderSelectionStep
            onBack={handleBack}
            onComplete={handleComplete}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
          />
        )}
      </CardContent>
    </Card>
  );
}
