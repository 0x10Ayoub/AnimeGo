
import { useEffect, useRef, useState } from "react";
import getGenresCollection from "../../api/getGenresCollection";
import { joinClassName } from "../../utils/joinClassName";
import SingleOption from "./SingleOption";
import { FilterTypes } from "../FilterReducer";
import BadgeCollection from "./BadgeCollection";
export default function GenresFilter({dispatchFilter, state, className }) {

    const [dropDownActive, SetDropDown] = useState(false);
    const [genresTagsSearch, setGenresTagsSearch] = useState([]);
    const [genresCollection,setGenresCollection] = useState(null);
    const [tagsCollection,setTagsCollection] = useState(null);
    const [tagsGenresSelection,setTagsGenresSelection] = useState([])
    const searchInputRef = useRef();
    const selectRef = useRef();

    useEffect(() => {
        if (genresCollection !== null) return;
        var genres = localStorage.getItem("genres");
        var tags = localStorage.getItem("tags");
        if (genres && tags) {
            setGenresCollection(JSON.parse(genres));
            setTagsCollection(JSON.parse(tags));
            return;
        }
        getGenresCollection().then(data => {
            if(!data) return;
            genres = data.genres;
            tags = data.tags;
            localStorage.setItem("genres", JSON.stringify(genres));
            localStorage.setItem("tags", JSON.stringify(tags));
             setGenresCollection(genres)
             setGenresCollection(tags)
        });

    }, [genresCollection,tagsCollection])

    useEffect(() => {
        document.addEventListener("mouseup", HandleDropDwon);

        function HandleDropDwon(e) {
            if (!selectRef.current || !selectRef.current.contains(e.target))
            {
                let isDropdownActive = e.target.isSameNode(searchInputRef.current);
                SetDropDown(isDropdownActive);
                if(!isDropdownActive && state.genres.length)
                {
                    //setGenresTagsSearch("");
                    //searchInputRef.current.value = state.year;
                }
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive,state.genres])


    function handleClick(e) {
        let payload = e.target.getAttribute("value") || e.target.closest("span[value]")?.getAttribute("value",3);
        if(!payload) return;
        let type = genresCollection.includes(payload) ? FilterTypes.GENRES : FilterTypes.TAGS; 
        dispatchFilter({ type, payload });
        if(tagsGenresSelection.includes(payload))
            setTagsGenresSelection([...tagsGenresSelection.filter(val => val !== payload)]);
        else
            setTagsGenresSelection([...tagsGenresSelection,payload]);
        // searchInputRef.current.value = value;
         //SetDropDown(false);
    }

    function setTagsGenreSearch(e) {
        setGenresTagsSearch(e.target.value)
    }
    
    return (
        <div id="Year" className={joinClassName(className, "relative m-auto")}>
            <label className="block" htmlFor="Genres">Genres</label>
            <div className="relative">
                <input ref={searchInputRef} type="search" autoComplete="off" name="Genres" onChange={setTagsGenreSearch} className="block p-2  w-48 rounded outline-none bg-gray-100 drop-shadow-md" />
                <BadgeCollection collection={tagsGenresSelection} />
            </div>
            {dropDownActive &&
                <div ref={selectRef} onClick={handleClick} className="mt-1 w-full  absolute max-h-96 h-fit scroll overflow-y-scroll bg-white text-gray-600">
                <span className="block w-full font-bold text-left pl-6"> GENRES</span>
                {
                    genresCollection.filter(genre => (!genresTagsSearch || (genre + "").includes(genresTagsSearch)))
                        .map((genre,index) => <SingleOption key={genre + index} value={genre} isActiveBadge={state.genres.includes(genre)} />)
                }
                <span className="block w-full font-bold text-left pl-6"> TAGS</span>
                {
                    tagsCollection.filter(tags => (!genresTagsSearch || (tags.name).includes(genresTagsSearch)))
                        .map(tags => <SingleOption key={tags.name} value={tags.name} isActiveBadge={state.tags.includes(tags.name)} />)
                }
            </div>
            }
        </div>

    )
}



