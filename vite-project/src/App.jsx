import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use';

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [movieList, setMovieList] = useState([])
  const [debounceTerm, setDebounceTerm] = useState('')

  useDebounce(() => setDebounceTerm(searchTerm) , 1000 , [searchTerm])

  const API_BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_TMDB_HEADER_KEY

  const API_OPTION = {
    method : 'GET',
    headers : {
      accept : 'application/json',
      Authorization : `Bearer ${API_KEY}`
    }
  }

  const fetchMovies = async (query = '') => {
      try{
        
        const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc` ;           //    https://api.themoviedb.org/3/search/movie
        console.log(endpoint)
        const response = await fetch(endpoint,API_OPTION)
        console.log("fetcheeeed")
        const data = await response.json()
        console.log(data)
        setMovieList(data.results)

      }
      catch (error){
        console.error(`Error fetcing movies : ${error}`)
      }
  }

  // useEffect(()=>{
  //   console.log("below is the movie  list")
  //   console.log(movieList)
  // },[movieList])
  
  // useEffect(()=>{
  //   fetchMovies(debounceTerm)
  // },[debounceTerm])

  
  useEffect(() => {
    console.log("fetch movie function call ...")
    fetchMovies(debounceTerm)
  },[debounceTerm])
    
  return (
    <main>
      <div className='Pattern' />

        <div className='wrapper'>

          <header>
          <img src="../public/hero-img.png" alt="Hero Banner" />
          <h1>Your Gateway to Cinematic <span className='text-gradient'>Wonders!</span> </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className='all-movies'>

            <h2 className='mt-[40px]'>All Movies</h2>
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>

            {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                { movieList.map((movie) => (
                  <ul key={movie.id} className='text-white'>
                      <p> {movie.title} </p>
                    </ul>
                    ))
                  }
            </div> */}

          </section>
          
        </div>


    </main>
  )
}

export default App
