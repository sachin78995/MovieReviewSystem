import { SearchBar } from "@/components/search-bar"
import { MovieList } from "@/components/movie-list"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Movie Review System
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Discover comprehensive details about popular films from Bollywood, Sandalwood, and Tollywood industries.
          </p>
        </div>

        <SearchBar />

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-amber-400">Popular Movies</h2>
          <MovieList />
        </div>
      </div>
    </main>
  )
}
