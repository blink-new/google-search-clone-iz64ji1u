import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Mic, Camera } from 'lucide-react'
import { Button } from './ui/button'

export default function Homepage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleLuckySearch = () => {
    if (query.trim()) {
      // For "I'm Feeling Lucky", we'll just redirect to the first result
      navigate(`/search?q=${encodeURIComponent(query.trim())}&lucky=true`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex justify-end items-center p-4 text-sm">
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-700 hover:underline transition-all duration-200">Gmail</a>
          <a href="#" className="text-gray-700 hover:underline transition-all duration-200">Images</a>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:shadow-md transition-shadow duration-200">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-20">
        {/* Google Logo */}
        <div className="mb-8 google-logo">
          <h1 className="text-9xl font-normal text-gray-800 tracking-tight select-none">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </h1>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="w-full max-w-xl">
          <div className="relative mb-8">
            <div className="flex items-center border border-gray-300 rounded-full px-5 py-4 hover:shadow-lg transition-all duration-300 focus-within:shadow-lg bg-white">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-gray-800 text-base placeholder-gray-500"
                autoComplete="off"
                autoFocus
                placeholder="Search Google or type a URL"
              />
              <div className="flex items-center space-x-3 ml-3">
                <button 
                  type="button" 
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  title="Search by voice"
                >
                  <Mic className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
                <button 
                  type="button" 
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  title="Search by image"
                >
                  <Camera className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              type="submit"
              variant="outline"
              className="px-6 py-3 bg-gray-50 border border-gray-200 rounded text-gray-700 hover:shadow-md hover:border-gray-300 hover:bg-gray-100 transition-all duration-200 font-medium"
            >
              Google Search
            </Button>
            <Button
              type="button"
              onClick={handleLuckySearch}
              variant="outline"
              className="px-6 py-3 bg-gray-50 border border-gray-200 rounded text-gray-700 hover:shadow-md hover:border-gray-300 hover:bg-gray-100 transition-all duration-200 font-medium"
            >
              I'm Feeling Lucky
            </Button>
          </div>
        </form>

        {/* Language Options */}
        <div className="mt-8 text-sm text-gray-600">
          Google offered in:{' '}
          <a href="#" className="text-blue-600 hover:underline transition-colors duration-200">Français</a>{' '}
          <a href="#" className="text-blue-600 hover:underline transition-colors duration-200">Español</a>{' '}
          <a href="#" className="text-blue-600 hover:underline transition-colors duration-200">Deutsch</a>{' '}
          <a href="#" className="text-blue-600 hover:underline transition-colors duration-200">中文</a>{' '}
          <a href="#" className="text-blue-600 hover:underline transition-colors duration-200">日本語</a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
        <div className="px-6 py-4">
          <div className="text-sm text-gray-600 text-center mb-3">
            Carbon neutral since 2007
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto text-sm text-gray-600 space-y-3 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6">
              <a href="#" className="hover:underline transition-colors duration-200">About</a>
              <a href="#" className="hover:underline transition-colors duration-200">Advertising</a>
              <a href="#" className="hover:underline transition-colors duration-200">Business</a>
              <a href="#" className="hover:underline transition-colors duration-200">How Search works</a>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <a href="#" className="hover:underline transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:underline transition-colors duration-200">Terms</a>
              <a href="#" className="hover:underline transition-colors duration-200">Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}