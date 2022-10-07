
import { useEffect, useMemo, useRef, useState } from "react";
import { joinClassName } from "../Utilities/Utilities";
import FilterDropdown from "./FilterDropdown";

export default function YearsFilter({ FilterType, dispatchFilter, state, className }) {

    const [dropDownActive, SetDropDown] = useState(false);
    const [yearFilter, setYearFilter] = useState(0);
    const searchInputRef = useRef();
    const selectRef = useRef();


    useEffect(() => {
        document.addEventListener("mouseup", HandleDropDwon);
        function HandleDropDwon(e) {
            if (!selectRef.current || !selectRef.current.contains(e.target))
            {
                let isDropdownActive = e.target.isSameNode(searchInputRef.current);
                SetDropDown(isDropdownActive);
                if(!isDropdownActive && state.year)
                {
                    setYearFilter(0);
                    searchInputRef.current.value = state.year;
                }
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive,state.year])


    function handleClick(e) {
        let value = e.target.getAttribute("value");
        if(value === null) return;
        dispatchFilter({ type: FilterType, payload: value });
        searchInputRef.current.value = value;
        SetDropDown(false);
    }
    function filterYear(e) {
        setYearFilter(e.target.value)
    }
    return (
        <div id="Year" className={joinClassName(className, "relative m-auto")}>
            <label className="block" htmlFor="years">Years</label>
            <input ref={searchInputRef} type="search" autoComplete="off" name="years" onChange={filterYear} className="block p-2  w-48 rounded outline-none bg-gray-100 drop-shadow-md" />
            {dropDownActive &&
                <FilterDropdown ref={selectRef} handleClick={handleClick} yearFilter={yearFilter} selectedyear={state.year}/>
            }
        </div>

    )
}




