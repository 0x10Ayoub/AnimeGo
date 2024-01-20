import { useReducer, useState, useRef, useEffect } from "react"

import { INITIAL_STATE, filterReducer, FilterTypes } from "./FilterReducer"
import {
    OpenSearch,
    YearsFilter,
    GenresFilter,
    SeasonFilter,
    FormatFilter,
    StatusFilter,
    CountryFilter,
    StreamingFilter,
    MediaSourceFilter,
    ActivefilterCollection
} from "./FilterOptionsComponents"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import useOnBlur from "./useOnBlur";

export default function FilterOption() {
    const [state, dispatchFilter] = useReducer(filterReducer, INITIAL_STATE);
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef();

    useOnBlur(selectRef, setIsOpen, isOpen, ["toggle-btn"]);

    function toggle(e) {
        e.stopPropagation();
        setIsOpen(!isOpen);
    }
    return (
        <div className="container  m-auto mt-10 2xl:pl-[100px] 2xl:pr-[100px] relative">
            <div className="flex max-w-full overflow-x-scroll p-2 overflow-y-hidden pb-[600px] -mb-[600px]">
                <OpenSearch className="m-2 flex-1 lg:flex-none md:block" dispatchFilter={dispatchFilter} state={state} />
                <GenresFilter className="m-2 hidden lg:block" FilterType={FilterTypes.GENRES} dispatchFilter={dispatchFilter} state={state} />
                <YearsFilter className="m-2 hidden lg:block" filterType={FilterTypes.YEAR} dispatchFilter={dispatchFilter} state={state} />
                <SeasonFilter className="m-2  hidden lg:block" filterType={FilterTypes.SEASON} dispatchFilter={dispatchFilter} state={state} />
                <FormatFilter className="m-2 hidden lg:block" FilterType={FilterTypes.FORMATS} dispatchFilter={dispatchFilter} state={state} />
                <StatusFilter className="m-2 hidden xl:block" filterType={FilterTypes.STATUS} dispatchFilter={dispatchFilter} state={state} />
                <div className="flex justify-end items-end relative m-2 ml-auto">
                    <button id="toggle-btn" onClick={toggle} className="block w-10 h-10 bg-slate-50 drop-shadow rounded-lg">
                        <FontAwesomeIcon className={`${isOpen ? "text-primary-blue" : ""} w-4 h-4`} icon={faSliders} />
                    </button>
                </div>
            </div>
            {isOpen &&
                <div className="w-full  rounded-md  lg:shadow-gray-200/20 lg:shadow-lg lg:absolute lg:bg-white lg:w-[70%] xl:w-[50%] lg:right-3 2xl:mr-[100px]" ref={selectRef}>
                    <div className="flex max-w-full overflow-x-scroll overflow-y-hidden pb-[600px] -mb-[600px] m-auto p-2">
                        <GenresFilter className="m-2 block lg:hidden" FilterType={FilterTypes.GENRES} dispatchFilter={dispatchFilter} state={state} />
                        <YearsFilter className="m-2 block lg:hidden" filterType={FilterTypes.YEAR} dispatchFilter={dispatchFilter} state={state} />
                        <SeasonFilter className="m-2  block lg:hidden" filterType={FilterTypes.SEASON} dispatchFilter={dispatchFilter} state={state} />
                        <FormatFilter className="m-2 block lg:hidden" FilterType={FilterTypes.FORMATS} dispatchFilter={dispatchFilter} state={state} />
                        <StatusFilter className="m-2 block xl:hidden" filterType={FilterTypes.STATUS} dispatchFilter={dispatchFilter} state={state} />
                        <StreamingFilter className="m-2 flex-1" filterType={FilterTypes.STREAMS} dispatchFilter={dispatchFilter} state={state} />
                        <CountryFilter className="m-2 flex-1" filterType={FilterTypes.COUNTRY} dispatchFilter={dispatchFilter} state={state} />
                        <MediaSourceFilter className="m-2 flex-1" filterType={FilterTypes.SOURCE} dispatchFilter={dispatchFilter} state={state} />
                    </div>
                </div>
            }
            <ActivefilterCollection FilterType={""} dispatchFilter={dispatchFilter} state={state} />
        </div>
    )
}