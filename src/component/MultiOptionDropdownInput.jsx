import { useState, useRef, useEffect } from "react";
import BadgeCollection from "./SingleBadgeCollection";
import { OperationTypes } from "./FilterReducer";
import SingleOption from "./SingleOption";
import { joinClassName } from "../utils/joinClassName";
import useOnBlur from "./useOnBlur";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export default function MultiOptionDropdownInput({ filterType, dispatchFilter, data, className, getData, title }) {

    const [isOpen, setIsOpen] = useState(false);
    const [inputSearch, setInputSearch] = useState("");
    const collection = getData();
    const [isSearchActive, setIsSearchAtive] = useState(false)
    const searchInputRef = useRef();
    const selectRef = useRef();



    useOnBlur(selectRef, setIsOpen, isOpen)


    function handleClick(payload, operation) {
        let type = filterType
        dispatchFilter({ type, payload, operation });
        setInputSearch("");
        searchInputRef.current.value = ""
        setIsSearchAtive(false);
    }


    function setTagsGenreSearch(e) {
        setInputSearch(e.target.value)
    }

    return (
        <div className={joinClassName(className, "relative m-auto")} onClick={() => setIsOpen(true)}>
            <label className="block capitalize text-left pl-2 font-semibold text-gray-800" htmlFor={filterType}>{title}</label>
            <div className="relative">
                <input ref={searchInputRef} type="search" placeholder={data.length ? " " : "Any"}
                    onClick={() => setIsSearchAtive(true)}
                    onBlur={() => setIsSearchAtive(false)}
                    autoComplete="off" name="Genres" onChange={setTagsGenreSearch} className="block p-2  w-40 lg:w-42 xl:w-48 rounded outline-none bg-gray-100 drop-shadow-md" />
                {
                    !isSearchActive && <BadgeCollection collection={data} onClick={() => handleClick(data[0], OperationTypes.DELETE)} />
                }
            </div>
            {isOpen &&
                <div className="fixed z-50 flex flex-col justify-center top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-80
                        md:absolute md:block md:rounded-md md:mt-2 md:bg-transparent md:h-96 md:top-[calc(100%+5px)]
                        " >
                    <div className=" p-1 flex justify-between  text-white ml-auto mr-auto mb-3 w-[90%] md:hidden">
                        <span className="block font-semibold  text-lg uppercase">{title}</span>
                        <FontAwesomeIcon className="block h-7" icon={faMinus} />
                    </div>
                    <div ref={selectRef} className="ml-auto mr-auto w-[90%] h-fit max-h-[60%] rounded-md  overflow-y-scroll bg-white text-gray-600
                            md:w-full  md:max-h-full  
                            ">
                        {mapCollection(collection, inputSearch, handleClick, data)}
                    </div>
                </div>
            }
        </div>

    )

}

function mapCollection(collection, inputSearch, handleClick, data) {
    if (!collection) return;
    if (Array.isArray(collection))
        return collection.filter(item => (!inputSearch || mapValue(item).toString().toLowerCase().includes(inputSearch)))
            .map((item) => hanldeSingelOpetion(mapValue(item), data, handleClick))
    return Object.keys(collection).map(item => <OptionWithGroup key={item} {...{ item, data, inputSearch, collection, handleClick }} />)
}

function hanldeSingelOpetion(value, arr, handleClick) {
    let selected = arr.includes(value);
    let operation = selected ? OperationTypes.DELETE : OperationTypes.ADD;
    return (
        <SingleOption onClick={() => handleClick(value, operation)} key={value} value={value} isActiveBadge={selected} />
    )
}

function OptionWithGroup({ item, data, inputSearch, collection, handleClick }) {

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

function mapValue(value) {
    return value.name ? value.name : value;
}