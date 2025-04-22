"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { movies } from "@/data/movies"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)

    // Simulate API call with timeout
    setTimeout(() => {
      const searchResults = movies
        .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)

      setResults(searchResults)
      setIsSearching(false)
    }, 300)
  }

  const handleMovieSelect = (movieId: string) => {
    setResults([])
    setQuery("")
    router.push(`/movies/${movieId}`)
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white pl-10 h-12 rounded-lg focus-visible:ring-amber-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
        <Button
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-amber-500 hover:bg-amber-600 text-white"
        >
          Search
        </Button>
      </form>

      {isSearching && (
        <div className="absolute z-10 mt-1 w-full bg-slate-800 rounded-md shadow-lg border border-slate-700 p-4 text-center text-slate-400">
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-slate-800 rounded-md shadow-lg border border-slate-700 overflow-hidden">
          <ul>
            {results.map((movie) => (
              <li key={movie.id} className="border-b border-slate-700 last:border-0">
                <button
                  onClick={() => handleMovieSelect(movie.id)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors flex items-center"
                >
                  <div className="w-10 h-14 mr-3 flex-shrink-0 bg-slate-700 rounded overflow-hidden">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">{movie.title}</div>
                    <div className="text-sm text-slate-400">
                      {movie.year} • {movie.industry}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
