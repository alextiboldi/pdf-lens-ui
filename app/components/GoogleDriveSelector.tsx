
'use client';

import { useState, useEffect } from 'react';

interface Folder {
  id: string;
  name: string;
}

interface Props {
  onFolderSelect: (folderId: string) => void;
}

export default function GoogleDriveSelector({ onFolderSelect }: Props) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [folderStack, setFolderStack] = useState<string[]>(['root']);
  const [currentFolderId, setCurrentFolderId] = useState<string>('root');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
  };

  return (
    <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {!isAuthenticated ? (
        <button
          onClick={handleConnect}
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Connecting...' : 'Connect to Google Drive'}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleBackClick}
              disabled={folderStack.length <= 1}
              className={`px-3 py-1 rounded ${
                folderStack.length <= 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Back
            </button>
            <button
              onClick={() => selectedFolder && onFolderSelect(selectedFolder)}
              disabled={!selectedFolder}
              className={`px-3 py-1 rounded ${
                !selectedFolder
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              Process
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => handleFolderClick(folder.id)}
                onDoubleClick={() => handleFolderDoubleClick(folder.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedFolder === folder.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  <span className="truncate">{folder.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
