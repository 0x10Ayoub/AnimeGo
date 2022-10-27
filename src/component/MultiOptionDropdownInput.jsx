import { useState, useRef, useEffect } from "react";
import BadgeCollection from "./SingleBadgeCollection";
import { OperationTypes } from "./FilterReducer";
import SingleOption from "./SingleOption";
import { joinClassName } from "../utils/joinClassName";
export default function MultiOptionDropdownInput({ filterType, dispatchFilter, data, className, getData }) {

    const [dropDownActive, SetDropDown] = useState(false);
    const [inputSearch, setInputSearch] = useState("");
    const collection = getData();
    const [isSearchActive, setIsSearchAtive] = useState(false)
    const searchInputRef = useRef();
    const selectRef = useRef();



    useEffect(() => {
        document.addEventListener("mouseup", HandleDropDwon);
        function HandleDropDwon(e) {
            let target = e.target;
            if (!selectRef.current || !selectRef.current.contains(target)) {
                let isDropdownActive = target.isSameNode(searchInputRef.current) ||
                    searchInputRef.current.parentNode === target.closest("div[data-value]")?.parentNode;
                setIsSearchAtive(target.isSameNode(searchInputRef.current))
                SetDropDown(isDropdownActive);
                if (!isDropdownActive && data.length) {
                    setIsSearchAtive(false);
                }
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive, data])


    function handleClick(payload, operation) {
        let type = filterType
        dispatchFilter({ type, payload, operation });
        setInputSearch("");
        setIsSearchAtive(false);
    }


    function setTagsGenreSearch(e) {
        setInputSearch(e.target.value)
    }

    return (
        <div className={joinClassName(className, "relative m-auto")}>
            <label className="block capitalize text-left pl-2 font-semibold text-gray-800" htmlFor={filterType}>{filterType.toString().toLowerCase()}</label>
            <div className="relative">
                <input ref={searchInputRef} type="search" placeholder={data.length ? " " : "Any"} autoComplete="off" name="Genres" onChange={setTagsGenreSearch} className="block p-2  w-48 rounded outline-none bg-gray-100 drop-shadow-md" />
                {
                    !isSearchActive && <BadgeCollection collection={data} onClick={() => handleClick(data[0], OperationTypes.DELETE)} />
                }
            </div>
            {dropDownActive &&
                <div ref={selectRef} className="mt-1 w-full  absolute max-h-96 h-fit scroll overflow-y-scroll bg-white text-gray-600">
                    {mapCollection(collection,inputSearch,handleClick,data)}
                </div>
            }
        </div>

    )
    
}



function mapCollection(collection,inputSearch,handleClick,data){
    if(!collection) return;
    if(Array.isArray(collection))
        return collection.filter(item => (!inputSearch || item.name.toString().toLowerCase().includes(inputSearch)))
            .map((item) => hanldeSingelOpetion(item.name, data, handleClick))
    return Object.keys(collection).map(item => <OptionWithGroup key={item} {...{item,data,inputSearch,collection,handleClick}}/>)
}

function hanldeSingelOpetion(value, arr, handleClick) {
    let selected = arr.includes(value);
    let operation = selected ? OperationTypes.DELETE : OperationTypes.ADD;
    return (
        <SingleOption onClick={() => handleClick(value, operation)} key={value} value={value} isActiveBadge={selected} />
    )
}

function OptionWithGroup({ item ,data,inputSearch,collection,handleClick}) {
    function mapValue(value) {
        return value.name ? value.name : value;
    }
    function GetOperationtype(val) {
        return !data.includes(mapValue(val)) ? OperationTypes.ADD : OperationTypes.DELETE;
    }
    return (
        <>
            <span className="block w-full font-bold text-left pl-6 capitalize"> {item}</span>
            {
                collection[item]
                    .filter(val => (!inputSearch || (mapValue(val)).toLowerCase().includes(inputSearch)))
                    .map((val) => <SingleOption onClick={() => handleClick(mapValue(val), GetOperationtype(val))} key={mapValue(val)}
                        value={mapValue(val)} isActiveBadge={data.includes(mapValue(val))} />)
            }
        </>
    )
}