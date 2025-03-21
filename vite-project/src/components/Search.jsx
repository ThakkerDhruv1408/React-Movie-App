import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
        <div>
            <img src="../../public/Vector.png" alt="Search" />

            <input type="text"
            placeholder='Search you Favourites'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search
