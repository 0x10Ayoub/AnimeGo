import React from 'react'
import NavBar from './NavBar';
import TopFive from './TopFive';
import NewEpisodes from './NewEpisodes';


function Home() {

    return (
        <div className='lg:container m-auto '>
            {/* <NavBar /> */}
            <TopFive />
            <NewEpisodes />
        </div>
    )
}

export default Home;