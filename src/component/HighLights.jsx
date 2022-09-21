import HeadLineImage from "./HeadLineImage"
import { use, useEffect, useState } from 'react'

var images = [
    "https://media.kitsu.io/anime/poster_images/8671/large.jpg",
    "https://media.kitsu.io/anime/44081/poster_image/large-049ba5097e6d6dbb515a0584a7ccd3b2.jpeg",
    "https://media.kitsu.io/anime/poster_images/12/large.jpg",
    "https://media.kitsu.io/anime/poster_images/10740/large.jpg",
    "https://media.kitsu.io/anime/43806/poster_image/large-815d6008fb3b56f4291b9f0ffa05cd8f.jpeg"
]

export default function HightLights() {
    const [height, SetHeight] = useState(600);

    useEffect(() => {
        var media = window.matchMedia("(max-width: 640px)");
        media.onchange = getHeigh;
        getHeigh(media);
    }, []);

    function getHeigh(e) {
        var height = e.matches ? 1200 : 720;
        SetHeight(height);
    }
    return (

        <div className="grid grid-cols-10  grid-rows-5 sm:grid-rows-6 gap-1 mt-10  " style={{ height: height }}>
            <HeadLineImage className="
                                    md:col-span-4 md:row-span-6
                                    sm:col-span-6 sm:row-span-4
                                    col-start-1 row-start-1 row-span-3 col-span-10"
                imageSource={images[0]} />
            <HeadLineImage className="
                            md:col-start-5 md:row-start-1 md:col-span-4 md:row-span-3 
                            sm:col-start-1 sm:row-start-5 sm:col-span-5 sm:row-span-2
                            row-start-4  col-span-5 row-span-1 "
                imageSource={images[1]} />
            <HeadLineImage className="
                            md:col-start-9 md:row-start-1 md:col-span-2 md:row-span-2 
                            sm:col-start-7 sm:row-start-1 sm:col-span-4 sm:row-span-2
                            col-start-6 row-start-4  col-span-5 row-span-1"
                imageSource={images[3]} />
            <HeadLineImage className="
                            md:col-start-5 md:row-start-4 md:col-span-4 md:row-span-3
                            sm:col-start-6 sm:row-start-5 sm:col-span-5 sm:row-span-2
                            row-start-5  col-span-5 row-span-1"
                imageSource={images[2]} />
            <HeadLineImage className="
                            md:col-span-2 md:row-span-4
                            sm:col-start-7 sm:row-start-3 sm:col-span-4 sm:row-span-2
                            col-start-6 row-start-5  col-span-5 row-span-1"
                imageSource={images[4]} />
        </div>
    )
}
