
import { useEffect, useRef, useState } from "react";
import getGenresCollection from "../../api/getGenresCollection";
import { joinClassName } from "../../utils/joinClassName";
import SingleOption from "./SingleOption";
import { FilterTypes, OperationTypes } from "../FilterReducer";
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


    function handleClick(payload, operation) {
        let type = FilterTypes.GENRES
        dispatchFilter({ type, payload ,operation});
        setGenresSearch("");
        setIsSearchAtive(false);
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
                    !isSearchActive && <BadgeCollection collection={state.genres} onClick={() => handleClick(state.genres[0], OperationTypes.DELETE)} />
                }
            </div>
            {dropDownActive &&
                <div ref={selectRef} className="mt-1 w-full  absolute max-h-96 h-fit scroll overflow-y-scroll bg-white text-gray-600">
                    {
                        Object.keys(genresCollection).map(key => <OptionWithGroup key={key} item={key} />)

                    }
                </div>
            }
        </div>

    )
    function OptionWithGroup({ item }) {
        function mapValue(value) {
            if (typeof value == "object")
                return value.name;
            return value;
        }
        function GetOperationtype(val){
            return !state.genres.includes(val) ? OperationTypes.ADD : OperationTypes.DELETE;
        }
        return (
            <>
                <span className="block w-full font-bold text-left pl-6 capitalize"> {item}</span>
                {
                    genresCollection[item]
                        .filter(val => (!genresSearch || (mapValue(val)).toLowerCase().includes(genresSearch)))
                        .map((val) => <SingleOption onClick={() => handleClick(mapValue(val), GetOperationtype(val))} key={mapValue(val)}
                            value={mapValue(val)} isActiveBadge={state.genres.includes(mapValue(val))} />)
                }
            </>
        )
    }
}





