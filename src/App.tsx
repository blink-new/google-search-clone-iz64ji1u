import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import SearchResults from './components/SearchResults'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App