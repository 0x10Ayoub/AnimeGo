import { useState, useRef, useEffect } from "react";
import { joinClassName } from "../utils/joinClassName";
import SingleOptionDropdown from "./filterOptions/SingleOptionDropDown";
export default function DropdownInput({ filterType, dispatchFilter, state, className, getData, prefix = "" }) {


    const [dropDownActive, SetDropDown] = useState(false);
    const [inputSearch, setInputSearch] = useState(0);
    const filter = filterType.toString().toLowerCase();
    const searchInputRef = useRef();
    const selectRef = useRef();

    useEffect(() => {
        searchInputRef.current.value = formatValue(state[filter]);
        document.addEventListener("mouseup", HandleDropDwon);
        function HandleDropDwon(e) {
            if (!selectRef.current || !selectRef.current.contains(e.target)) {
                let isDropdownActive = e.target.isSameNode(searchInputRef.current);
                SetDropDown(isDropdownActive);
                if (!isDropdownActive && state[filter])
                    setInputSearch("");
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive, filter, state])


    function handleOnClick(payload, operation) {

        let type = filterType;
        dispatchFilter({ type, payload, operation });
        searchInputRef.current.value = payload;
        SetDropDown(false);
    }

    function setInputFilter(e) {
        setInputSearch(e.target.value)
    }

    return (
        <div className={joinClassName(className, "relative m-auto")}>
            <label className="block capitalize text-left pl-2 font-semibold text-gray-800" htmlFor={filter}>{prefix + filter}</label>
            <input ref={searchInputRef} type="search" placeholder="Any" autoComplete="off" name="season" onChange={setInputFilter} className="block p-2  w-48 rounded outline-none text-primary-blue bg-gray-100 drop-shadow-md" />
            {dropDownActive &&
                <SingleOptionDropdown ref={selectRef} handleOnClick={handleOnClick} filterValue={inputSearch} selectedValue={state[filter]} getData={getData} />
            }
        </div>

    )

}

function formatValue(value){
    return value?.toString().toLowerCase().replace(RegExp("_", "g"), " ");
}