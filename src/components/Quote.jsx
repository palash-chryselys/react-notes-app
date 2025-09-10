import { useState, useEffect } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://quoteslate.vercel.app/api/quotes/random');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setQuote({
        content: data.quote,
        author: data.author,
        tags: data.tags || []
      });
    } catch (err) {
      setError('Could not load quote. Please try again.');
      console.error('Quote fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg sticky top-5">
      <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
        <span className="text-2xl">💡</span>
        Daily Inspiration
      </h2>
      
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-3"></div>
          <p className="text-gray-600 italic">Loading quote...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-6">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchQuote} 
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
      
      {quote && !loading && !error && (
        <div className="mb-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg border-l-4 border-indigo-500">
            <blockquote className="text-gray-700 italic leading-relaxed mb-3">
              "{quote.content}"
            </blockquote>
            <div className="flex justify-between items-end">
              <cite className="text-sm text-gray-600 font-medium">
                — {quote.author}
              </cite>
              {quote.tags && quote.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {quote.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={fetchQuote} 
        disabled={loading}
        className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Loading...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            New Quote
          </>
        )}
      </button>
    </div>
  );
};

export default Quote;
