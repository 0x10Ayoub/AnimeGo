import SingleYear from "./SingleYear";
import { useEffect, useMemo, useRef, useState } from "react";
import { joinClassName } from "../Utilities/Utilities";
import ActiveBadge from "./ActiveBadge";

export default function YearsFilter({ FilterType, dispatchFilter, state, className }) {

    const [dropDownActive, SetDropDrown] = useState(false);
    const [yearFilter, setYearFilter] = useState(0);
    const searchInputRef = useRef();
    const selectRef = useRef();
    const years = useMemo(yearGenerator, []);

    useEffect(() => {
        document.addEventListener("mouseup", HandleDropDwon);
        function HandleDropDwon(e) {
            if (!selectRef.current || !selectRef.current.contains(e.target))
                SetDropDrown(e.target.isSameNode(searchInputRef.current));
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive])


    function handleClick(e) {
        let value = e.target.getAttribute("value");
        dispatchFilter({ type: FilterType, payload: value });
        searchInputRef.current.value = value;
        SetDropDrown(false);
    }
    function filterYear(e) {
        setYearFilter(e.target.value)
    }
    return (
        <div id="Year" className={joinClassName(className, "relative m-auto")}>
            <label className="block" htmlFor="years">Years</label>
            <input ref={searchInputRef} type="search" autoComplete="off" name="years" onChange={filterYear} className="block p-2  w-48 rounded outline-none bg-gray-100 drop-shadow-md" />
            {dropDownActive &&
                <div ref={selectRef} onClick={handleClick} className="mt-1 w-full  absolute max-h-96 h-fit scroll overflow-y-scroll bg-white text-gray-600">
                    {
                        years.filter(y => (!yearFilter || (y + "").includes(yearFilter)))
                            .map(y => <SingleYear key={y} value={y} ActiveBadge={Number(y) == Number(state.year) ? ActiveBadge : null} />)
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

