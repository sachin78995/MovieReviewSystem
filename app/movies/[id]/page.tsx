"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Film, Star, Users, DollarSign, Globe } from "lucide-react"
import Link from "next/link"
import { movies } from "@/data/movies"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function MovieDetails() {
  const params = useParams()
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      const foundMovie = movies.find((m) => m.id === params.id)
      setMovie(foundMovie)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [params.id])

  if (loading) {
    return <MovieDetailsSkeleton />
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-500">Movie not found</h1>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Go back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to search
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden shadow-xl bg-slate-800">
              <img src={movie.poster || "/placeholder.svg"} alt={movie.title} className="w-full h-auto object-cover" />
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>

            <div className="flex items-center mb-6">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="text-xl font-semibold">{movie.imdbRating}/10</span>
              <span className="text-slate-400 ml-2">IMDb Rating</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-slate-400 mr-2" />
                <span className="text-slate-300">Year: </span>
                <span className="ml-2 font-medium">{movie.year}</span>
              </div>

              <div className="flex items-center">
                <Globe className="h-5 w-5 text-slate-400 mr-2" />
                <span className="text-slate-300">Industry: </span>
                <span className="ml-2 font-medium">{movie.industry}</span>
              </div>

              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-slate-400 mr-2" />
                <span className="text-slate-300">Budget: </span>
                <span className="ml-2 font-medium">₹{movie.budget} Crores</span>
              </div>

              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-slate-400 mr-2" />
                <span className="text-slate-300">Collection: </span>
                <span className="ml-2 font-medium">₹{movie.collection} Crores</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <Film className="h-5 w-5 text-slate-400 mr-2" />
                Genres
              </h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre: string) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <Users className="h-5 w-5 text-slate-400 mr-2" />
                Cast
              </h2>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor: string) => (
                  <Badge key={actor} variant="outline" className="bg-slate-700/50">
                    {actor}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Review</h2>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-300 italic">{movie.review}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-32 mb-8">
          <Skeleton className="h-full w-full bg-slate-700" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Skeleton className="w-full aspect-[2/3] rounded-lg bg-slate-700" />
          </div>

          <div className="md:col-span-2">
            <Skeleton className="h-10 w-3/4 mb-4 bg-slate-700" />
            <Skeleton className="h-6 w-40 mb-6 bg-slate-700" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-full bg-slate-700" />
              ))}
            </div>

            <Skeleton className="h-8 w-40 mb-3 bg-slate-700" />
            <div className="flex flex-wrap gap-2 mb-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full bg-slate-700" />
              ))}
            </div>

            <Skeleton className="h-8 w-40 mb-3 bg-slate-700" />
            <div className="flex flex-wrap gap-2 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-24 rounded-full bg-slate-700" />
              ))}
            </div>

            <Skeleton className="h-8 w-40 mb-3 bg-slate-700" />
            <Skeleton className="h-32 w-full rounded-lg bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  )
}
