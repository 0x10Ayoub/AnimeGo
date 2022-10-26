
import {  useEffect, useRef, useState } from "react";
import getGenresCollection from "../../api/getGenresCollection";
import { joinClassName } from "../../utils/joinClassName";
import SingleOption from "./SingleOption";
import { FilterTypes } from "../FilterReducer";
import BadgeCollection from "./SingleBadgeCollection";
export default function GenresFilter({ dispatchFilter, state, className }) {

    const [dropDownActive, SetDropDown] = useState(false);
    const [genresSearch, setGenresSearch] = useState([]);
    const [genresCollection, setGenresCollection] = useState(null);
    const [isSearchActive, setIsSearchAtive] = useState(false)
    const searchInputRef = useRef();
    const selectRef = useRef();

    useEffect(() => {
        if (genresCollection !== null) return;
        var genres = localStorage.getItem("genres");
        if (genres) {
            setGenresCollection(JSON.parse(genres));
            return;
        }
        getGenresCollection().then(data => {
            if (!data) return;
            var genres = data;
            console.log(genres);
            localStorage.setItem("genres", JSON.stringify(genres));
            setGenresCollection(genres)
        });

    }, [genresCollection])

    useEffect(() => {
        document.addEventListener("mouseup", HandleDropDwon);
        function HandleDropDwon(e) {
            let target = e.target;
            if (!selectRef.current || !selectRef.current.contains(target)) {
                let isDropdownActive = target.isSameNode(searchInputRef.current) ||
                    searchInputRef.current.parentNode === target.closest("div[data-value]")?.parentNode;
                setIsSearchAtive(target.isSameNode(searchInputRef.current))
                SetDropDown(isDropdownActive);
                if (!isDropdownActive && state.genres.length) {
                    setIsSearchAtive(false);
                }
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive, state.genres])


    function handleClick(e) {
        let payload = e.target.getAttribute("value") || e.target.closest("span[value]")?.getAttribute("value", 3);
        if (!payload) return;
        let type = FilterTypes.GENRES

        dispatchFilter({ type, payload });
        setGenresSearch("");
        setIsSearchAtive(false);
        //SetDropDown(false);
    }


    function setTagsGenreSearch(e) {
        setGenresSearch(e.target.value)
    }

    return (
        <div className={joinClassName(className, "relative m-auto")}>
            <label className="block" htmlFor="Genres">Genres</label>
            <div className="relative">
                <input ref={searchInputRef} type="search" placeholder={state.genres.length ? " " : "Any"} autoComplete="off" name="Genres" onChange={setTagsGenreSearch} className="block p-2  w-48 rounded outline-none bg-gray-100 drop-shadow-md" />
                {
                    !isSearchActive && <BadgeCollection collection={state.genres} onClick={handleClick} />
                }
            </div>
            {dropDownActive &&
                <div ref={selectRef} onClick={handleClick} className="mt-1 w-full  absolute max-h-96 h-fit scroll overflow-y-scroll bg-white text-gray-600">
                    {
                        Object.keys(genresCollection).map(key => <OptionWithGroup key={key} item={key}/>)

                    }
                </div>
            }
        </div>

    )
    function OptionWithGroup({item}) {

        return (
            <>
                <span className="block w-full font-bold text-left pl-6 capitalize "> {item}</span>
                {
                    genresCollection[item].filter(val => (!genresSearch || (GetValue(val)).toLowerCase().includes(genresSearch)))
                    .map((val) => <SingleOption key={GetValue(val)} value={GetValue(val)}
                        isActiveBadge={state.genres.includes(GetValue(val))} />)
                }
            </>
        )
    }
}

function GetValue(value){
    if(typeof value == "object")
        return value.name;
    return value;
}



