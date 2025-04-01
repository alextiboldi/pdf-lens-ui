"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Folder, ChevronLeft, Loader2 } from "lucide-react";

interface FolderSelectionStepProps {
  onBack: () => void;
  onComplete: () => void;
  selectedFolder: string | null;
  setSelectedFolder: (folder: string | null) => void;
}

interface FolderResponse {
  folders: string[];
}

interface Folder {
  id: string;
  name: string;
}
export default function FolderSelectionStep({
  onBack,
  onComplete,
  selectedFolder,
  setSelectedFolder,
}: FolderSelectionStepProps) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");
  const [folderStack, setFolderStack] = useState<string[]>(["root"]);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        const { authenticated } = await response.json();
        setIsAuthenticated(authenticated);
        if (authenticated) {
          fetchFolders("root");
        } else {
          await handleConnect({}); // Pass empty object initially
        }
      } catch (error) {
        console.error("Failed to check auth:", error);
      }
    };
    const handleConnect = async (projectDetails: any) => {
      try {
        setLoading(true);
        const params = new URLSearchParams(projectDetails);
        const response = await fetch(`/api/auth/google?${params}`);
        const auth = await response.json();

        if (auth.url) {
          window.location.href = auth.url;
        }
      } catch (error) {
        console.error("Failed to connect:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const fetchFolders = async (folderId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/drive/folders?parentId=${folderId}`);
      const data = await response.json();
      console.log("Folders:", data);
      setFolders(data.folders);
      setCurrentFolderId(folderId);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleFolderClick = (folder: string) => {
    setSelectedFolder(folder);
  };

  const handleFolderDoubleClick = (folderId: string) => {
    setFolderStack((prev) => [...prev, currentFolderId]);
    fetchFolders(folderId);
  };
  const handleBackClick = () => {
    if (folderStack.length > 1) {
      const previousFolder = folderStack[folderStack.length - 2];
      setFolderStack((prev) => prev.slice(0, -1));
      fetchFolders(previousFolder);
      setSelectedFolder("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">
          {currentPath.length === 0
            ? "Select a folder from Google Drive"
            : `Folder: /${currentPath.join("/")}`}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleBackClick}
          disabled={folderStack.length <= 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {error && (
        <div className="p-4 mb-4 text-sm text-destructive bg-destructive/10 rounded-md">
          {error}
        </div>
      )}

      <div className="border rounded-md min-h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : folders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
            <p>No folders found in this location</p>
          </div>
        ) : (
          <div className="flex gap-4 flex-wrap overflow-y-auto p-4">
            {folders.map((folder, index) => (
              <div
                key={folder + "_" + index}
                className={`flex flex-col items-center h-24 w-36 p-4 rounded-md border cursor-pointer transition-colors ${
                  selectedFolder === folder.id
                    ? "bg-primary/10 border-primary"
                    : "hover:bg-muted"
                }`}
                onClick={() => handleFolderClick(folder.id)}
                onDoubleClick={() => handleFolderDoubleClick(folder.id)}
              >
                <Folder className="h-12 w-12 text-muted-foreground mb-2" />
                <span className="text-sm text-center truncate w-full">
                  {folder.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Previous
        </Button>
        <Button onClick={onComplete} disabled={!selectedFolder}>
          Process
        </Button>
      </div>
    </div>
  );
}