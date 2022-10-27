
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
        searchInputRef.current.value = state.season;
        function HandleDropDwon(e) {
            if (!selectRef.current || !selectRef.current.contains(e.target))
            {
                let isDropdownActive = e.target.isSameNode(searchInputRef.current);
                SetDropDown(isDropdownActive);
                if(!isDropdownActive && state.season)
                    setSeasonFilter("");
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive,state.season])


    function handleOnClick(payload,operation) {

        let type = FilterTypes.SEASON;
        dispatchFilter({ type, payload, operation});
        if(!state.year)
            dispatchFilter({ type: FilterTypes.YEAR, payload: new Date().getFullYear().toString() });
        searchInputRef.current.value = payload;
        SetDropDown(false);
    }

    function SetSeasonFilter(e) {
        setSeasonFilter(e.target.value)
    }

    return (
        <div id="Year" className={joinClassName(className, "relative m-auto")}>
            <label className="block" htmlFor="season">Season</label>
            <input ref={searchInputRef} type="search" placeholder="Any" autoComplete="off" name="season" onChange={SetSeasonFilter} className="block p-2  w-48 rounded outline-none text-primary-blue bg-gray-100 drop-shadow-md" />
            {dropDownActive &&
                <SingleOptionDropdown ref={selectRef} handleOnClick={handleOnClick} filterValue={seasonFilter} selectedValue={state.season} GetData={GetSeason}/>
            }
        </div>

    )
}

function GetSeason(){
    return ["Winter","Spring","Summer","Fall"]
}