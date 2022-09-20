import React from 'react'
import NavBar from './NavBar';
import HightLights from './HighLights';


function Home() {

    async function GetData() {
        var request = new Request("https://kitsu.io/api/edge/anime",
            {
                headers: {
                    "Accept": "application/vnd.api+json",
                    "Content-Type": "application/vnd.api+json"
                }
            });
        request = await fetch(request);
        var jsonData = await request.json();
        console.log(jsonData.data[0]);
    }
    return (
        <div className='lg:container m-auto '>
            <NavBar />
            <HightLights />
        </div>
    )
}

export default Home;