import { useEffect, useRef, useState } from "react";


export default function TopAnime({ className, animeData }) {


    function handleClick(e) {
        window.location.href = `/anime/${animeData?.id}/${animeData?.title.english}`;
    }

    return (
        <div  className={className} onClick={handleClick}>
            <div className="overflow-hidden relative flex  justify-center h-full w-full  rounded-lg bg-local bg-center bg-no-repeat bg-cover"
                style={{ backgroundColor: animeData?.color , backgroundImage:`url(${animeData?.coverImage?.extraLarge})`}}>
                <div className="bg-gradient-to-t from-slate-900  via-transparent to-transparent absolute bottom-0 h-full w-full rounded-lg
                    hover:from-violet-900 hover:cursor-pointer" > </div>
                {/* <img  src={animeData?.coverImage.extraLarge} alt="Anime name" className="d-block absolute"  /> */}
                <span className="hover:cursor-pointer relative self-end text-white font-bold mb-4">
                    {animeData?.title.english}
                </span>
            </div>
        </div>
    )
}
