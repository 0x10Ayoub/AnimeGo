

export default function SingleAnime ({title,cover}) {

    return(
        <div className="bg-blue-900 rounded-md h-72 w-full max-w-sm">
            <img src={cover.extraLarge}  className="max-h-full max-w-full" alt={title.userPreferred}/>
            <h3>{title.romaji}</h3>
        </div>
    )
}