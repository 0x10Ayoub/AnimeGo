
import { data } from "autoprefixer";
import { useEffect, useState, } from "react"
import SingleAnime from "./SingleAnime"
import GetTopFive from "./TopFiveModule"

export default function TrendingNow() {


    return (

        <div >
            <h2>New Episodes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 auto-cols-auto justify-items-center">
                <SingleAnime key={34223} title="oneTitle" cover='#' />
            </div>
            <div className="mt-5">
                <button className="rounded-md bg-pink-900 p-5">Click to Add more</button>
            </div>
        </div>
    )
}