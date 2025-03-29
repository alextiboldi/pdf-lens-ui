
'use client';

import { useState } from 'react';
import { google } from 'googleapis';

interface Folder {
  id: string;
  name: string;
}

export default function GoogleDriveSelector() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const { authenticated } = await response.json();
        setIsAuthenticated(authenticated);
        if (authenticated) {
          fetchFolders();
        }
      } catch (error) {
        console.error('Failed to check auth:', error);
      }
    };
    checkAuth();
  }, []);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/drive/folders');
      const data = await response.json();
      setFolders(data.folders);
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

  return (
    <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {!folders.length ? (
        <button
          onClick={handleConnect}
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Connecting...' : 'Connect to Google Drive'}
        </button>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Select a folder</h3>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a folder</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
