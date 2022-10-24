
import { useState,useRef,useEffect } from "react";
import { joinClassName } from "../../utils/joinClassName";
import SingleOptionDropdown from "./SingleOptionDropDown";
import getMediaStatus from "../../api/getMediaStatus";
export default function MediaStatusFilter({ FilterType, dispatchFilter, state, className }) {

    const [dropDownActive, SetDropDown] = useState(false);
    const [AiringFilter, setMediaStatusFilter] = useState(0);
    const [MediaStatusCollection,SetMediaStatusCollection] = useState([]);
    const searchInputRef = useRef();
    const selectRef = useRef();

    useEffect(() => {
        if (MediaStatusCollection.length !== 0) return;
       var formats = localStorage.getItem("mediaStatus");
       if (formats) {
        SetMediaStatusCollection([...JSON.parse(formats)]);
           return;
       }
       
       getMediaStatus().then(data => {
           if(!data || !data.__type || !data.__type.enumValues) return;
           var mediaStatus = data.__type.enumValues;
           localStorage.setItem("mediaStatus", JSON.stringify(mediaStatus));
           SetMediaStatusCollection([...mediaStatus])
       });

   }, [MediaStatusCollection])

    useEffect(() => {
        document.addEventListener("mouseup", HandleDropDwon);
        function HandleDropDwon(e) {
            if (!selectRef.current || !selectRef.current.contains(e.target))
            {
                let isDropdownActive = e.target.isSameNode(searchInputRef.current);
                SetDropDown(isDropdownActive);
                if(!isDropdownActive && state.mediaStatus)
                {
                    setMediaStatusFilter("");
                    searchInputRef.current.value = state.mediaStatus?.toLowerCase().replace(RegExp("_","g")," ");
                }
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive,state.mediaStatus])


    function handleClick(e) {
        let value = e.target.getAttribute("value") || e.target.closest("span[value]")?.getAttribute("value");
        if(value === null) return;
        dispatchFilter({ type: FilterType, payload: value });
        searchInputRef.current.value = value.toLowerCase().replace(RegExp("_","g")," ");
        SetDropDown(false);
    }

    function handleInputChange(e) {
        setMediaStatusFilter(e.target.value)
    }

    return (
        <div id="Year" className={joinClassName(className, "relative m-auto")}>
            <label className="block" htmlFor="mediaStatus">Airing Status</label>
            <input ref={searchInputRef} type="search" autoComplete="off" name="mediaStatus" onChange={handleInputChange} className="block  capitalize p-2  w-48 rounded outline-none bg-gray-100 text-primary-blue  drop-shadow-md" />
            {dropDownActive &&
                <SingleOptionDropdown ref={selectRef} handleClick={handleClick} filterValue={AiringFilter} selectedValue={state.mediaStatus} GetData={()=>MediaStatusCollection}/>
            }
        </div>

    )
}
