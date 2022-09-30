import SingleYear from "./SingleYear";
import { FilterTypes } from "../FilterReducer";
import { useCallback, useEffect, useRef, useState } from "react";
const year = yearGenerator();

export default function YearsFilter({ dispatchFilter, className }) {

    const [dropDownActive, SetDropDrown] = useState(false);
    const [yearFilter, setYearFilter] = useState(0);
    const searchInputRef = useRef();
    const selectRef = useRef();


    useEffect(() => {
        document.addEventListener("mouseup", HandleDropDwon);
        function HandleDropDwon(e) {
            if(!selectRef.current  || !selectRef.current.contains(e.target))
            SetDropDrown(e.target.isSameNode(searchInputRef.current));
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive])


    function handleClick(e) {
        // e.target.appendChild(document.createTextNode("selected"));
        let year = e.target.getAttribute("value");
        dispatchFilter({ type: FilterTypes.YEAR, payload: year });
        searchInputRef.current.value = year;
        SetDropDrown(false);
    }
    function filterYear(e) {
        setYearFilter(e.target.value)
    }
    return (
        <div id="Year" className={className}>
            <label className="block" htmlFor="years">Years</label>
            <input ref={searchInputRef} type="search" autoComplete="off" name="years" onChange={filterYear} className="block p-2  w-48 rounded outline-none bg-gray-100 drop-shadow-md" />
            {dropDownActive &&
                <div ref={selectRef} onClick={handleClick} className="mt-1 w-full  absolute max-h-96 h-fit overflow-y-scroll bg-white text-gray-600">
                    {
                        year.filter(y => (!yearFilter || (y + "").includes(yearFilter)))
                            .map(y => <SingleYear key={y} year={y} />)
                    }
                </div>
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

