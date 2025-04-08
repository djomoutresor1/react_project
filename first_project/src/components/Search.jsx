import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='search'>
            <div>
                <img src="../src/assets/search.svg" alt="Search" />
                <input type="text" placeholder='Search Movies...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="submit">Search</button>
            </div>
            <div className='search-results'>
            </div>

        </div>
    )
}

export default Search