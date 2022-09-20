import HeadLineImage from "./HeadLineImage"
import {use, useEffect, useState} from 'react'
var images = [
    "https://media.kitsu.io/anime/poster_images/8671/large.jpg",
]
export default function HightLights() {
    const [height,SetHeight] = useState(600);

    useEffect(()=>{
        window.matchMedia("(max-width: 640px)").onchange = getHeigh;
    },[]);

    function getHeigh(e)
    {
        console.log(e);
        var height = e.matches ? 1200 : 600;
        SetHeight(height);
    }
    return (

        <div className="grid grid-cols-10  grid-rows-6 md:grid-rows-6 gap-1 mt-10  " style={{ height: height }}>
            <HeadLineImage className="bg-blue-500 
                                    md:col-span-4 md:row-span-6
                                    sm:col-span-6 sm:row-span-6
                                    col-start-2 row-start-1 row-span-3 col-span-8 
                                    " 
                                    imageSource={images[0]} />
            <div className="bg-red-500 
                            md:col-start-5 md:row-start-1 md:col-span-4 md:row-span-3 
                            sm:col-start-1 sm:row-start-7 sm:col-span-5 sm:row-span-3">
                                red
            </div>
            <div className="bg-yellow-500 
                            md:col-start-9 md:row-start-1 md:col-span-2 md:row-span-2 
                            sm:col-start-7 sm:row-start-1 sm:col-span-4 sm:row-span-3 
            ">
                yellow
            </div>
            <div className="bg-orange-500 
                md:col-start-5 md:row-start-4 md:col-span-4 md:row-span-3
                sm:col-start-6 sm:row-start-7 sm:col-span-5 sm:row-span-3
            ">
                orange
            </div>
            <div className="bg-green-500 
                    md:col-span-2 md:row-span-4
                    sm:col-start-7 sm:row-start-4 sm:col-span-4 sm:row-span-3
            ">
                green
            </div>
        </div>
    )
}
