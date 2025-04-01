"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { DataSource, ProjectDetails } from "../project-wizard";

interface ProjectDetailsStepProps {
  initialValues: ProjectDetails;
  onSubmit: (values: ProjectDetails) => void;
}

export default function ProjectDetailsStep({
  initialValues,
  onSubmit,
}: ProjectDetailsStepProps) {
  const [values, setValues] = useState<ProjectDetails>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProjectDetails, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ProjectDetails]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDataSourceChange = (value: DataSource) => {
    setValues((prev) => ({ ...prev, dataSource: value }));
    if (errors.dataSource) {
      setErrors((prev) => ({ ...prev, dataSource: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProjectDetails, string>> = {};

    if (!values.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!values.description.trim()) {
      newErrors.description = "Project description is required";
    }

    if (!values.dataSource) {
      newErrors.dataSource = "Please select a data source";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Enter project name"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Enter project description"
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Data Source</Label>
        <RadioGroup
          value={values.dataSource || ""}
          onValueChange={handleDataSourceChange}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div className="flex items-center space-x-2 rounded-md border hover:border-primary p-4">
            <RadioGroupItem value="google-drive" id="google-drive" />
            <Label htmlFor="google-drive" className="flex-1 cursor-pointer">
              Google Drive
            </Label>
          </div>

          <div className="flex items-center space-x-2 rounded-md border hover:border-primary p-4 opacity-50">
            <RadioGroupItem value="google-bucket" id="google-bucket" disabled />
            <Label
              htmlFor="google-bucket"
              className="flex-1 cursor-not-allowed"
            >
              Google Bucket
            </Label>
          </div>

          <div className="flex items-center space-x-2 rounded-md border hover:border-primary p-4 opacity-50">
            <RadioGroupItem value="aws-s3" id="aws-s3" disabled />
            <Label htmlFor="aws-s3" className="flex-1 cursor-not-allowed">
              AWS S3
            </Label>
          </div>
        </RadioGroup>
        {errors.dataSource && (
          <p className="text-sm text-destructive">{errors.dataSource}</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
