import { useReducer, useState, useRef } from "react"
import OpenSearch from "./filterOptions/OpenSearch"
import { INITIAL_STATE, filterReducer, FilterTypes } from "./FilterReducer"
import YearsFilter from "./filterOptions/YearsFilter";
import GenresFilter from "./filterOptions/GenresFilter";
import SeasonFilter from "./filterOptions/SeasonFilter";
import FormatFilter from "./filterOptions/FormatFilter";
import StatusFilter from "./filterOptions/StatusFilter";
import CountryFilter from "./filterOptions/CountryFilter";
import StreamingFilter from "./filterOptions/StreamingFilter";
import MediaSourceFilter from "./filterOptions/MediaSourceFilter";
import ActivefilterCollection from "./filterOptions/ActivefilterCollection";
import OtherFilters from "./filterOptions/OtherFilters";
import useOnBlur from "./useOnBlur";
export default function FilterOption() {
    const [state, dispatchFilter] = useReducer(filterReducer, INITIAL_STATE);
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef();
    // useOnBlur(selectRef, setIsOpen, isOpen);

    function toggle(e) {
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
                <OtherFilters className="flex justify-end items-end relative m-2 ml-auto" onClick={toggle} isOpen={isOpen} />
            </div>
            {isOpen &&
                <div className="w-full  rounded-md lg:absolute lg:bg-slate-50 lg:w-[70vw] xl:w-[50vw] lg:right-3 2xl:mr-[100px]" ref={selectRef}>
                    <div className="flex max-w-full overflow-x-scroll overflow-y-hidden pb-[600px] -mb-[600px] m-auto p-2">
                        <GenresFilter className="m-2 block lg:hidden" FilterType={FilterTypes.GENRES} dispatchFilter={dispatchFilter} state={state} />
                        <YearsFilter className="m-2 block lg:hidden" filterType={FilterTypes.YEAR} dispatchFilter={dispatchFilter} state={state} />
                        <SeasonFilter className="m-2  block lg:hidden" filterType={FilterTypes.SEASON} dispatchFilter={dispatchFilter} state={state} />
                        <FormatFilter className="m-2 block xl:hidden" FilterType={FilterTypes.FORMATS} dispatchFilter={dispatchFilter} state={state} />
                        <StatusFilter className="m-2 block lg:hidden" filterType={FilterTypes.STATUS} dispatchFilter={dispatchFilter} state={state} />
                        <StreamingFilter className="m-2" filterType={FilterTypes.STREAMS} dispatchFilter={dispatchFilter} state={state} />
                        <CountryFilter className="m-2" filterType={FilterTypes.COUNTRY} dispatchFilter={dispatchFilter} state={state} />
                        <MediaSourceFilter className="m-2" filterType={FilterTypes.SOURCE} dispatchFilter={dispatchFilter} state={state} />
                    </div>
                </div>
            }
            <ActivefilterCollection FilterType={""} dispatchFilter={dispatchFilter} state={state} />
        </div>
    )
}