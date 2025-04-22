"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star } from "lucide-react"
import { movies } from "@/data/movies"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function MovieList() {
  const [loading, setLoading] = useState(true)
  const [displayedMovies, setDisplayedMovies] = useState<any[]>([])

  useEffect(() => {
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      // Get 8 random movies to display
      const shuffled = [...movies].sort(() => 0.5 - Math.random())
      setDisplayedMovies(shuffled.slice(0, 8))
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

function MovieCard({ movie }: { movie: any }) {
  return (
    <Link href={`/movies/${movie.id}`} className="group">
      <div className="bg-slate-800 rounded-lg overflow-hidden shadow-md transition-transform group-hover:scale-[1.02] group-hover:shadow-xl">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center">
            <Star className="h-3 w-3 text-yellow-400 mr-1" />
            <span className="text-xs font-medium">{movie.imdbRating}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{movie.title}</h3>
          <div className="flex items-center text-sm text-slate-400 mb-2">
            <span>{movie.year}</span>
            <span className="mx-1">•</span>
            <span>{movie.industry}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre: string) => (
              <Badge key={genre} variant="outline" className="text-xs bg-slate-700/50">
                {genre}
              </Badge>
            ))}
            {movie.genres.length > 2 && (
              <Badge variant="outline" className="text-xs bg-slate-700/50">
                +{movie.genres.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

function MovieCardSkeleton() {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-md">
      <Skeleton className="aspect-[2/3] w-full bg-slate-700" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2 bg-slate-700" />
        <Skeleton className="h-4 w-1/2 mb-3 bg-slate-700" />
        <div className="flex gap-1">
          <Skeleton className="h-5 w-16 rounded-full bg-slate-700" />
          <Skeleton className="h-5 w-16 rounded-full bg-slate-700" />
        </div>
      </div>
    </div>
  )
}
