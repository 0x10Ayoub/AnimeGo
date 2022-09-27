import React from 'react'
import NavBar from './NavBar';
import TopFive from './TopFive';
import TrendingNow from './TrendingNow';
import FilterOption from './FilterOptions'

function Home() {

    return (
        <div className='m-auto '>
            { <NavBar /> }
            <TopFive />
            <FilterOption />
            <TrendingNow />
        </div>
    )
}

export default Home;