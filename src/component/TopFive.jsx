import TopAnime from "./TopAnime"
import { useEffect, useState } from 'react'
import GetTopFive from "../api/TopFiveModule"



export default function TopFive() {
    const [height, SetHeight] = useState(720);
    const [animeData, SetAnimeData] = useState([null,null,null,null,null]);

    useEffect(() => {
        var media = window.matchMedia("(max-width: 640px)");
        media.onchange = getHeigh;
        getHeigh(media);
    }, []);


    useEffect(() => {
        if (animeData[0] !== null) return;
        var dataTopFive = localStorage.getItem("topfive");
        if (dataTopFive) {
            SetAnimeData(JSON.parse(dataTopFive));
            return;
        }
        GetTopFive().then(data => {
           var dataTopFive = data?.Page?.media;
            localStorage.setItem("topfive", JSON.stringify(dataTopFive));
            SetAnimeData(data?.Page?.media)
        });

    }, [animeData])

    function getHeigh(e) {
        var height = e.matches ? 1200 : 720;
        SetHeight(height);
    }
    return (
        <div className="text-white container m-auto font-mono">
            <h3 className="text-start text-lg font-bold"> Top 5 Trending</h3>
            <div className="grid grid-cols-10  grid-rows-5 sm:grid-rows-6 gap-1 mt-10  " style={{ height: height }}>
                {
                    animeData.map((animeData,index)=> <TopAnime className={"topAnime-".concat(index + 1)} key={animeData ? animeData.id : index + 1} animeData={animeData != null ? animeData : null} />)
                }
                
            </div>
        </div>

    )
}

