import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search, Mic, Camera, Settings, MapPin } from 'lucide-react'
import { createClient } from '@blinkdotnew/sdk'

const blink = createClient({
  projectId: 'google-search-clone-iz64ji1u',
  authRequired: false
})

interface SearchResult {
  title: string
  link: string
  snippet: string
  source?: string
}

interface SearchData {
  organic_results?: SearchResult[]
  related_searches?: string[]
  people_also_ask?: Array<{ question: string; answer: string }>
}

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<SearchData | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('all')

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setQuery(q)
      document.title = `${q} - Google Search`
      performSearch(q)
    }
  }, [searchParams])

  const performSearch = async (searchQuery: string) => {
    setLoading(true)
    try {
      const searchResults = await blink.data.search(searchQuery, {
        limit: 10
      })
      setResults(searchResults)
    } catch (error) {
      console.error('Search failed:', error)
      // Fallback to mock data for demo
      setResults({
        organic_results: [
          {
            title: `${searchQuery} - Wikipedia`,
            link: `https://en.wikipedia.org/wiki/${searchQuery.replace(/\s+/g, '_')}`,
            snippet: `${searchQuery} is a search term that you entered. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.`
          },
          {
            title: `${searchQuery} - Official Website`,
            link: `https://${searchQuery.toLowerCase().replace(/\s+/g, '')}.com`,
            snippet: `Official website for ${searchQuery}. Find the latest information, news, and updates about ${searchQuery}. Discover comprehensive resources and detailed information.`
          },
          {
            title: `Learn more about ${searchQuery} - Complete Guide`,
            link: `https://guide.example.com/${searchQuery.replace(/\s+/g, '-')}`,
            snippet: `Comprehensive guide and information about ${searchQuery}. Everything you need to know about this topic including tutorials, best practices, and expert insights.`
          },
          {
            title: `${searchQuery} News and Updates`,
            link: `https://news.example.com/${searchQuery}`,
            snippet: `Latest news and updates about ${searchQuery}. Stay informed with the most recent developments, announcements, and industry insights.`
          },
          {
            title: `Best ${searchQuery} Resources`,
            link: `https://resources.example.com/${searchQuery}`,
            snippet: `Curated collection of the best resources for ${searchQuery}. Tools, guides, tutorials, and expert recommendations to help you succeed.`
          }
        ],
        related_searches: [
          `${searchQuery} meaning`,
          `${searchQuery} definition`,
          `${searchQuery} examples`,
          `${searchQuery} guide`,
          `best ${searchQuery}`,
          `${searchQuery} tutorial`,
          `${searchQuery} vs alternatives`,
          `${searchQuery} tips`
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  const formatResultCount = (count: number) => {
    return count.toLocaleString()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center space-x-4 md:space-x-8">
            {/* Logo */}
            <button 
              onClick={handleLogoClick}
              className="text-2xl md:text-3xl font-normal text-gray-800 tracking-tight hover:opacity-80 transition-opacity duration-200 google-logo flex-shrink-0"
            >
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </button>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 hover:shadow-lg transition-all duration-300 focus-within:shadow-lg bg-white">
                <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 outline-none text-gray-800 text-sm md:text-base"
                  autoComplete="off"
                />
                <div className="flex items-center space-x-2 md:space-x-3 ml-3">
                  <button 
                    type="button" 
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    title="Search by voice"
                  >
                    <Mic className="w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                  <button 
                    type="button" 
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    title="Search by image"
                  >
                    <Camera className="w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>
            </form>

            {/* Right side */}
            <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
              <Settings className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-200" />
              <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center hover:shadow-md transition-shadow duration-200">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Search Tabs */}
          <div className="mt-4 flex items-center space-x-4 md:space-x-8 text-sm overflow-x-auto">
            <button
              onClick={() => setSelectedTab('all')}
              className={`flex items-center space-x-2 pb-2 border-b-2 whitespace-nowrap transition-colors duration-200 ${
                selectedTab === 'all' 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>All</span>
            </button>
            <button
              onClick={() => setSelectedTab('images')}
              className={`pb-2 border-b-2 whitespace-nowrap transition-colors duration-200 ${
                selectedTab === 'images' 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setSelectedTab('videos')}
              className={`pb-2 border-b-2 whitespace-nowrap transition-colors duration-200 ${
                selectedTab === 'videos' 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setSelectedTab('news')}
              className={`pb-2 border-b-2 whitespace-nowrap transition-colors duration-200 ${
                selectedTab === 'news' 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              News
            </button>
            <button
              onClick={() => setSelectedTab('maps')}
              className={`flex items-center space-x-2 pb-2 border-b-2 whitespace-nowrap transition-colors duration-200 ${
                selectedTab === 'maps' 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Maps</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-6">
        {loading ? (
          <div className="space-y-6">
            {/* Loading skeleton */}
            <div className="h-4 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="text-sm text-gray-600 mb-6">
              About {formatResultCount(results?.organic_results?.length || 0)} results (0.{Math.floor(Math.random() * 60) + 10} seconds)
            </div>

            {/* Search Results */}
            <div className="space-y-8">
              {results?.organic_results?.map((result, index) => (
                <div key={index} className="max-w-2xl search-result" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-sm text-green-700 mb-1 break-all">
                    {result.link}
                  </div>
                  <h3 className="text-lg md:text-xl text-blue-600 hover:underline cursor-pointer mb-1 leading-tight">
                    <a href={result.link} target="_blank" rel="noopener noreferrer" className="block">
                      {result.title}
                    </a>
                  </h3>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {result.snippet}
                  </p>
                </div>
              ))}
            </div>

            {/* People Also Ask */}
            {results?.people_also_ask && results.people_also_ask.length > 0 && (
              <div className="mt-12">
                <h3 className="text-lg font-medium text-gray-900 mb-4">People also ask</h3>
                <div className="space-y-2">
                  {results.people_also_ask.map((item, index) => (
                    <details key={index} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                      <summary className="p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 font-medium">
                        {item.question}
                      </summary>
                      <div className="px-4 pb-4 text-gray-700 leading-relaxed">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Related Searches */}
            {results?.related_searches && results.related_searches.length > 0 && (
              <div className="mt-12 border-t border-gray-200 pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Related searches</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {results.related_searches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(`/search?q=${encodeURIComponent(search)}`)}
                      className="text-left p-3 rounded-lg hover:bg-gray-50 text-blue-600 border border-gray-200 transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <span>{search}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-16 flex justify-center">
              <div className="flex items-center space-x-1">
                <span className="text-2xl md:text-3xl font-normal text-gray-800 tracking-tight mr-6 md:mr-8 google-logo">
                  <span className="text-blue-500">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-500">g</span>
                  <span className="text-green-500">l</span>
                  <span className="text-red-500">e</span>
                </span>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded text-sm transition-all duration-200 ${
                      page === 1 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="text-blue-600 hover:underline ml-4 text-sm transition-colors duration-200">Next</button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}