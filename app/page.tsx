import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">PDF Lens</span>
            <span className="block text-blue-600 dark:text-blue-400 mt-2">Organize your PDF files effortlessly</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect your Google Drive, select your PDF folder, and enhance your documents with powerful metadata management.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Connect Google Drive
            </button>
            <button className="rounded-md bg-gray-100 dark:bg-gray-700 px-6 py-3 text-lg font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            How it works
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div className="text-center">
              <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">1. Connect</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">Securely connect your Google Drive account</p>
              </div>
            </div>
            <div className="text-center">
              <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">2. Select</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">Choose the folder containing your PDF files</p>
              </div>
            </div>
            <div className="text-center">
              <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">3. Manage</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">Add and organize metadata for your documents</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}