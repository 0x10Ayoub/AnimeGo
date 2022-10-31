import { useState, useRef, useEffect } from "react";
import { joinClassName } from "../utils/joinClassName";
import SingleOptionDropdown from "./filterOptions/SingleOptionDropDown";
import useOnBlur from "./useOnBlur";
export default function DropdownInput({ filterType, dispatchFilter, state, className, getData, title}) {


    const [isOpen, setIsOpen] = useState(false);
    const [inputSearch, setInputSearch] = useState(0);
    const filter = filterType.toString().toLowerCase();
    const searchInputRef = useRef();
    const selectRef = useRef();

    useOnBlur(selectRef,setIsOpen,isOpen);

    useEffect(() => {
        searchInputRef.current.value = formatValue(state[filter]);
    }, [filter, state])

    function handleOnClick(payload, operation) {

        let type = filterType;
        dispatchFilter({ type, payload, operation });
        searchInputRef.current.value = payload;
        setIsOpen(false);
    }

    function setInputFilter(e) {
        setInputSearch(e.target.value)
    }

    return (
        <div className={joinClassName(className, "relative m-auto")} onClick={()=>{setIsOpen(true)}}>
            <label className="block capitalize text-left pl-2 font-semibold text-gray-800" htmlFor={filter}>{title}</label>
            <input ref={searchInputRef} type="search" placeholder="Any" autoComplete="off" name="season" onChange={setInputFilter} className="block p-2  w-40 lg:w-42 xl:w-48 rounded outline-none text-primary-blue bg-gray-100 drop-shadow-md" />
            {isOpen &&
                <SingleOptionDropdown label={title} ref={selectRef} handleOnClick={handleOnClick} filterValue={inputSearch} selectedValue={state[filter]} getData={getData} />
            }
        </div>

    )

}

function formatValue(value){
    if(!value) return "";
    return value.toString().toLowerCase().replace(RegExp("_", "g"), " ");
}