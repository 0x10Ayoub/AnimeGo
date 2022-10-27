
import React from "react";
import { useEffect, useRef, useState } from "react";
import { joinClassName } from "../../utils/joinClassName";
import SingleOptionDropdown from "./SingleOptionDropDown"
import { OperationTypes,FilterTypes } from "../FilterReducer";

export default function YearsFilter({ FilterType, dispatchFilter, state, className }) {

    const [dropDownActive, SetDropDown] = useState(false);
    const [yearFilter, setYearFilter] = useState(0);
    const searchInputRef = useRef();
    const selectRef = useRef();


    useEffect(() => {
        searchInputRef.current.value = state.year
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


    function handleOnClick(payload,operation) {
        let type = FilterTypes.YEAR;
        dispatchFilter({ type, payload ,operation});
        SetDropDown(false);
    }

    function filterYear(e) {
        setYearFilter(e.target.value)
    }

    return (
        <div id="Year" className={joinClassName(className, "relative m-auto")}>
            <label className="block" htmlFor="years">Years</label>
            <input ref={searchInputRef} type="search" placeholder="Any" autoComplete="off" name="years" onChange={filterYear} className="block p-2  w-48 rounded outline-none text-primary-blue bg-gray-100 drop-shadow-md" />
            {dropDownActive &&
                <SingleOptionDropdown ref={selectRef} handleOnClick={handleOnClick} filterValue={yearFilter} selectedValue={state.year} GetData={yearGenerator}/>
            }
        </div>

    )
}



function yearGenerator() {
    var startYear = 1950;
    var endYear = new Date().getFullYear() + 1;
    var res = new Array(endYear - startYear);
    for (let i = endYear, k = 0; i >= startYear; i--) {
        res[k++] = i;
    }
    return res;
}



