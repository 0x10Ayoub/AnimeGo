
import { useEffect, useRef, useState } from "react";
import getFormats from "../../api/getFormats";
import { joinClassName } from "../../utils/joinClassName";
import SingleOption from "./SingleOption";
import { FilterTypes } from "../FilterReducer";
import BadgeCollection from "./SingleBadgeCollection";

export default function FormatFilter({dispatchFilter, state, className }) {

    const [dropDownActive, SetDropDown] = useState(false);
    const [formatsInputSearch, setFormatsInputSearch] = useState("");
    const [formatsCollection,setformatsCollection] = useState([]);
    const [formatsSeclection,setFormatsSeclection] = useState([])
    const [isSearchActive,setIsSearchAtive] = useState(false)
    const searchInputRef = useRef();
    const selectRef = useRef();

    useEffect(() => {
         if (formatsCollection.length !== 0) return;
        var formats = localStorage.getItem("formats");
        if (formats) {
            setformatsCollection([...JSON.parse(formats)]);
            return;
        }
        
        getFormats().then(data => {
            if(!data || !data.__type || !data.__type.enumValues) return;
            formats = data.__type.enumValues;
            localStorage.setItem("formats", JSON.stringify(formats));
             setformatsCollection([...formats])
        });

    }, [formatsCollection])

    useEffect(() => {
        document.addEventListener("mouseup", HandleDropDwon);

        function HandleDropDwon(e) {
            let target = e.target;
            if (!selectRef.current || !selectRef.current.contains(target))
            {
                let isDropdownActive = target.isSameNode(searchInputRef.current) || 
                                    searchInputRef.current.parentNode === target.closest("div[data-value]")?.parentNode;
                setIsSearchAtive(target.isSameNode(searchInputRef.current))
                SetDropDown(isDropdownActive);
                if(!isDropdownActive && state.formats.length)
                    setIsSearchAtive(false);
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive,state.formats])


    function handleClick(e) {
        let payload = e.target.getAttribute("value") || e.target.closest("span[value]")?.getAttribute("value");
        if(!payload) return;
        let type =  FilterTypes.FORMATS; 
        
        dispatchFilter({ type, payload });
        if(formatsSeclection.includes(payload))
            setFormatsSeclection([...formatsSeclection.filter(val => val !== payload)]);
        else
            setFormatsSeclection([...formatsSeclection,payload]);

        searchInputRef.current.value = "";
        setFormatsInputSearch("");
        setIsSearchAtive(false);
         //SetDropDown(false);
    }

    function setFormatsSearch(e) {
        setFormatsInputSearch(e.target.value)
    }
    
    return (
        <div className={joinClassName(className, "relative m-auto")}>
            <label className="block" htmlFor="Format">Format</label>
            <div className="relative">
                <input ref={searchInputRef} type="search" autoComplete="off" name="Format" onChange={setFormatsSearch} className="block p-2  w-48 rounded outline-none bg-gray-100 drop-shadow-md" />
               {
                    !isSearchActive && <BadgeCollection collection={formatsSeclection} onClick={handleClick} />
                }
            </div>
            {dropDownActive &&
                <div ref={selectRef} onClick={handleClick} className="mt-1 w-full  absolute max-h-96 h-fit scroll overflow-y-scroll bg-white text-gray-600">
                { 
                    formatsCollection.filter(item => (!formatsInputSearch || item.name.toLowerCase().includes(formatsInputSearch)))
                     .map((item,index) => <SingleOption key={item.name + index} value={item.name} isActiveBadge={formatsSeclection.includes(item.name)} />)
                }
               
            </div>
            }
        </div>

    )
}



