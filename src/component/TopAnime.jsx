

export default function TopAnime({ className, animeData }) {
    
    function handleClick(e)
    {
        window.location.href = "#" + e.target;
    }

    return (
        <div className={className} onClick={handleClick}>
            <div className="relative flex  justify-center h-full w-full  rounded-lg bg-local bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${animeData?.coverImage.large})` }} >
                <div className="bg-gradient-to-t from-black  via-transparent to-transparent absolute bottom-0 h-full w-full rounded-lg
                    hover:from-violet-900 hover:cursor-pointer" > </div>
                <img src="" alt="Anime name" className="invisible absolute" />
                <span className="font-sans hover:cursor-pointer relative self-end text-white font-bold mb-4">
                    {animeData?.title.english}
                </span>
            </div>
        </div>
    )
}
