
import { useCallback, useEffect, useRef, useState } from "react";
import getGenresCollection from "../../api/getGenresCollection";
import { joinClassName } from "../../utils/joinClassName";
import SingleOption from "./SingleOption";
import { FilterTypes } from "../FilterReducer";
import BadgeCollection from "./SingleBadgeCollection";
export default function GenresFilter({dispatchFilter, state, className }) {

    const [dropDownActive, SetDropDown] = useState(false);
    const [genresTagsSearch, setGenresTagsSearch] = useState([]);
    const [genresCollection,setGenresCollection] = useState(null);
    const [tagsCollection,setTagsCollection] = useState(null);
    const [tagsGenresSelection,setTagsGenresSelection] = useState([])
    const [isSearchActive,setIsSearchAtive] = useState(false)
    const [collectionOrder,setCollectionOrder] = useState(["genres","tags"]);
    const setCollectionOrderCallBack = useCallback(HandleTagesGenresSelection,[collectionOrder,state])
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
        
        setTagsGenresSelection(setCollectionOrderCallBack(FilterTypes.GENRES));
        searchInputRef.current.value = tagsGenresSelection.length ? " " : "";

        function HandleDropDwon(e) {
            let target = e.target;
            if (!selectRef.current || !selectRef.current.contains(target))
            {
                let isDropdownActive = target.isSameNode(searchInputRef.current) || 
                                    searchInputRef.current.parentNode === target.closest("div[data-value]")?.parentNode;
                setIsSearchAtive(target.isSameNode(searchInputRef.current))
                SetDropDown(isDropdownActive);
                if(!isDropdownActive && state.genres.length)
                {
                    setIsSearchAtive(false);
                }
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive,state.genres,state.tags,tagsGenresSelection.length,setCollectionOrderCallBack])


    function handleClick(e) {
        let payload = e.target.getAttribute("value") || e.target.closest("span[value]")?.getAttribute("value",3);
        if(!payload) return;
        let type = genresCollection.includes(payload) ? FilterTypes.GENRES : FilterTypes.TAGS; 
        
        dispatchFilter({ type, payload });
        HandleTagesGenresSelection(type);

        searchInputRef.current.value = "";
        setGenresTagsSearch("");
        setIsSearchAtive(false);
         //SetDropDown(false);
    }

    function HandleTagesGenresSelection(type) {
        const filter = type.toLowerCase();
        console.log(filter)
        if(state[filter].length === 0 && collectionOrder[0] === filter)
            setCollectionOrder((arr)=>[arr[1],arr[0]])
        if(state[filter].length !== 0 && collectionOrder[0] !== filter && state[collectionOrder[0]].length === 0)
            setCollectionOrder((arr)=>[arr[1],arr[0]])
        return [...state[collectionOrder[0]],...state[collectionOrder[1]]];
    }
    function setTagsGenreSearch(e) {
        setGenresTagsSearch(e.target.value)
    }
    
    return (
        <div className={joinClassName(className, "relative m-auto")}>
            <label className="block" htmlFor="Genres">Genres</label>
            <div className="relative">
                <input ref={searchInputRef} type="search" placeholder="Any" autoComplete="off" name="Genres" onChange={setTagsGenreSearch} className="block p-2  w-48 rounded outline-none bg-gray-100 drop-shadow-md" />
               {
                    !isSearchActive && <BadgeCollection collection={tagsGenresSelection} onClick={handleClick} />
                }
            </div>
            {dropDownActive &&
                <div ref={selectRef} onClick={handleClick} className="mt-1 w-full  absolute max-h-96 h-fit scroll overflow-y-scroll bg-white text-gray-600">
                <span className="block w-full font-bold text-left pl-6"> GENRES</span>
                {
                    genresCollection.filter(genre => (!genresTagsSearch || (genre).toLowerCase().includes(genresTagsSearch)))
                        .map((genre,index) => <SingleOption key={genre + index} value={genre} isActiveBadge={tagsGenresSelection.includes(genre)} />)
                }
                <span className="block w-full font-bold text-left pl-6"> TAGS</span>
                {
                    tagsCollection.filter(tags => (!genresTagsSearch || (tags.name).toLowerCase().includes(genresTagsSearch)))
                        .map(tags => <SingleOption key={tags.name} value={tags.name} isActiveBadge={tagsGenresSelection.includes(tags.name)} />)
                }
            </div>
            }
        </div>

    )
}



