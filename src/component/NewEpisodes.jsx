
import { data } from "autoprefixer";
import { useEffect, useState, } from "react"
import Episode from "./Episode"
import GetTopFive from "./TopFiveModule"

export default function NewEpisodes() {

    const [trends, SetTrends] = useState(null);

    // useEffect(() => {
    //     if (trends !== null) return;
    //     GetTrends().then(data => {
    //         SetTrends(data.Page.media)
    //     });

    // }, [trends])

    return (

        <div >
            <h2>New Episodes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 auto-cols-auto justify-items-center">
                {
                    trends !== null && trends.map(media => {
                        return <Episode key={media.id} title={media.title} cover={media.coverImage} />
                    })
                }
            </div>
            <div className="mt-5">
                <button className="rounded-md bg-pink-900 p-5">Click to Add more</button>
            </div>
        </div>
    )
}