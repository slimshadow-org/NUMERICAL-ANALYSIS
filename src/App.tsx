import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Loader2 } from 'lucide-react';

interface ApiResponse {
  title: string;
  url: string;
}

function App() {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://numerical-analysis.slimshadowapps.workers.dev/?search=${encodeURIComponent(query)}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      const debounce = setTimeout(() => {
        fetchData(search);
      }, 500);
      return () => clearTimeout(debounce);
    }
  }, [search]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 to-purple-100">
      {/* App Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex justify-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">Numerical Analysis</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search titles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start gap-4">
                    <h2 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">{item.title}</h2>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 transition-colors p-1.5 sm:p-2 hover:bg-indigo-50 rounded-full flex-shrink-0"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && data.length === 0 && search && (
          <div className="text-center py-20">
            <p className="text-sm sm:text-base text-gray-600">No results found for "{search}"</p>
          </div>
        )}

        {!loading && !search && (
          <div className="text-center py-20">
            <p className="text-sm sm:text-base text-gray-600">Start searching to see results</p>
          </div>
        )}
      </main>

      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Numerical Analysis
            </p>
            <p className="text-sm text-gray-500">
              Part of slimshadow.org
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;