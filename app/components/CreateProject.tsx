"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GoogleDriveSelector from "./GoogleDriveSelector";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string(),
  datasource: z.string().min(1, "Please select a data source"),
  folderId: z.string().optional(),
});

const dataSources = [
  {
    id: "google-drive",
    name: "Google Drive",
    icon: "/globe.svg",
    active: true,
    description: "Connect and manage your Google Drive files",
  },
  {
    id: "google-bucket",
    name: "Google Bucket",
    icon: "/window.svg",
    active: false,
    description: "Store and retrieve files from Google Cloud Storage",
  },
  {
    id: "aws-s3",
    name: "AWS S3",
    icon: "/file.svg",
    active: false,
    description: "Leverage Amazon S3 for file storage",
  },
];

export default function CreateProject() {
  const [selectedFolder, setSelectedFolder] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      datasource: "",
      folderId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error creating project:", error);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dataSources.map((source) => (
                  <div
                    key={source.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      form.watch("datasource") === source.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary"
                    } ${!source.active && "opacity-50 cursor-not-allowed"}`}
                    onClick={() => {
                      if (source.active) {
                        form.setValue("datasource", source.id);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={source.icon}
                        alt={source.name}
                        width={24}
                        height={24}
                      />
                      <h3 className="font-medium">{source.name}</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {source.description}
                    </p>
                  </div>
                ))}
              </div>

              {form.watch("datasource") === "google-drive" && (
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="folderId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Folder</FormLabel>
                        <FormControl>
                          <GoogleDriveSelector
                            onFolderSelect={(folderId) => {
                              field.onChange(folderId);
                              setSelectedFolder(folderId);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <Button type="submit" className="w-full" size="lg">
                Create Project
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
