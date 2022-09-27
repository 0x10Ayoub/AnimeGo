import TopAnime from "./TopAnime"
import { useEffect, useState } from 'react'
import GetTopFive from "./TopFiveModule"



export default function TopFive() {
    const [height, SetHeight] = useState(720);
    const [animeData, SetAnimeData] = useState(null);

    useEffect(() => {
        var media = window.matchMedia("(max-width: 640px)");
        media.onchange = getHeigh;
        getHeigh(media);
    }, []);


    useEffect(() => {
        if (animeData !== null) return;
        var dataTopFive = localStorage.getItem("topfive");
        if (dataTopFive) {

            SetAnimeData(JSON.parse(dataTopFive));
            return;
        }
        GetTopFive().then(data => {
            dataTopFive = data?.Page?.media;
            localStorage.setItem("topfive", JSON.stringify(dataTopFive));
            SetAnimeData(data?.Page?.media)
        });

    }, [animeData])

    function getHeigh(e) {
        var height = e.matches ? 1200 : 720;
        SetHeight(height);
    }
    return (
        <div className="text-white container m-auto">
            <h3 className="text-start text-lg font-bold"> Top 5 Trending</h3>
            <div className="grid grid-cols-10  grid-rows-5 sm:grid-rows-6 gap-1 mt-10  " style={{ height: height }}>
                <TopAnime className="
                                    md:col-span-4 md:row-span-6
                                    sm:col-span-6 sm:row-span-4
                                    col-start-1 row-start-1 row-span-3 col-span-10"
                    animeData={animeData != null ? animeData[0] : null} />
                <TopAnime className="
                            md:col-start-5 md:row-start-1 md:col-span-4 md:row-span-3 
                            sm:col-start-1 sm:row-start-5 sm:col-span-5 sm:row-span-2
                            row-start-4  col-span-5 row-span-1 "
                    animeData={animeData != null ? animeData[1] : null} />
                <TopAnime className="
                            md:col-start-9 md:row-start-1 md:col-span-2 md:row-span-2 
                            sm:col-start-7 sm:row-start-1 sm:col-span-4 sm:row-span-2
                            col-start-6 row-start-4  col-span-5 row-span-1"
                    animeData={animeData != null ? animeData[2] : null} />
                <TopAnime className="
                            md:col-start-5 md:row-start-4 md:col-span-4 md:row-span-3
                            sm:col-start-6 sm:row-start-5 sm:col-span-5 sm:row-span-2
                            row-start-5  col-span-5 row-span-1"
                    animeData={animeData != null ? animeData[3] : null} />
                <TopAnime className="
                            md:col-span-2 md:row-span-4
                            sm:col-start-7 sm:row-start-3 sm:col-span-4 sm:row-span-2
                            col-start-6 row-start-5  col-span-5 row-span-1"
                    animeData={animeData != null ? animeData[4] : null} />
            </div>
        </div>

    )
}
