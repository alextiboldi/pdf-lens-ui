'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  onFolderSelect: (folderId: string) => void;
}

interface Folder {
  id: string;
  name: string;
}

export default function GoogleDriveSelector({ onFolderSelect }: Props) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [folderStack, setFolderStack] = useState<string[]>(['root']);
  const [currentFolderId, setCurrentFolderId] = useState<string>('root');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const { authenticated } = await response.json();
        setIsAuthenticated(authenticated);
        if (authenticated) {
          fetchFolders('root');
        }
      } catch (error) {
        console.error('Failed to check auth:', error);
      }
    };
    checkAuth();
  }, []);

  const fetchFolders = async (folderId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/drive/folders?parentId=${folderId}`);
      const data = await response.json();
      setFolders(data.folders);
      setCurrentFolderId(folderId);
    } catch (error) {
      console.error('Failed to fetch folders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/google');
      const auth = await response.json();

      if (auth.url) {
        window.location.href = auth.url;
      }
    } catch (error) {
      console.error('Failed to connect:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderDoubleClick = (folderId: string) => {
    setFolderStack(prev => [...prev, currentFolderId]);
    fetchFolders(folderId);
  };

  const handleBackClick = () => {
    if (folderStack.length > 1) {
      const previousFolder = folderStack[folderStack.length - 1];
      setFolderStack(prev => prev.slice(0, -1));
      fetchFolders(previousFolder);
      setSelectedFolder('');
    }
  };

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId);
    onFolderSelect(folderId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Select Google Drive Folder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select Folder</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!isAuthenticated ? (
            <Button
              onClick={handleConnect}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Connecting...' : 'Connect to Google Drive'}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <Button
                  onClick={handleBackClick}
                  disabled={folderStack.length <= 1}
                  variant="outline"
                >
                  Back
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    onClick={() => handleFolderClick(folder.id)}
                    onDoubleClick={() => handleFolderDoubleClick(folder.id)}
                    className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors ${
                      selectedFolder === folder.id ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    <p className="truncate">{folder.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}