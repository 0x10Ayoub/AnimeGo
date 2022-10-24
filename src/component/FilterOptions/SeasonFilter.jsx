
import { useState,useRef,useEffect } from "react";
import { joinClassName } from "../../utils/joinClassName";
import SingleOptionDropdown from "./SingleOptionDropDown";
import { FilterTypes } from "../FilterReducer";
export default function SeasonFilter({ FilterType, dispatchFilter, state, className }) {

    const [dropDownActive, SetDropDown] = useState(false);
    const [seasonFilter, setSeasonFilter] = useState(0);
    const searchInputRef = useRef();
    const selectRef = useRef();


    useEffect(() => {
        document.addEventListener("mouseup", HandleDropDwon);
        function HandleDropDwon(e) {
            if (!selectRef.current || !selectRef.current.contains(e.target))
            {
                let isDropdownActive = e.target.isSameNode(searchInputRef.current);
                SetDropDown(isDropdownActive);
                if(!isDropdownActive && state.season)
                {
                    setSeasonFilter("");
                    searchInputRef.current.value = state.season;
                }
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive,state.season])


    function handleClick(e) {
        let value = e.target.getAttribute("value") || e.target.closest("span[value]")?.getAttribute("value");
        if(value === null) return;
        dispatchFilter({ type: FilterType, payload: value });
        if(!state.year)
            dispatchFilter({ type: FilterTypes.YEAR, payload: new Date().getFullYear().toString() });
        searchInputRef.current.value = value;
        SetDropDown(false);
    }

    function SetSeasonFilter(e) {
        setSeasonFilter(e.target.value)
    }

    return (
        <div id="Year" className={joinClassName(className, "relative m-auto")}>
            <label className="block" htmlFor="season">Season</label>
            <input ref={searchInputRef} type="search" autoComplete="off" name="season" onChange={SetSeasonFilter} className="block p-2  w-48 rounded outline-none text-primary-blue bg-gray-100 drop-shadow-md" />
            {dropDownActive &&
                <SingleOptionDropdown ref={selectRef} handleClick={handleClick} filterValue={seasonFilter} selectedValue={state.season} GetData={GetSeason}/>
            }
        </div>

    )
}

function GetSeason(){
    return ["Winter","Spring","Summer","Fall"]
}