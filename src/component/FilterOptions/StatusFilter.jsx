
import { useState,useRef,useEffect } from "react";
import { joinClassName } from "../../utils/joinClassName";
import SingleOptionDropdown from "./SingleOptionDropDown";
import getStatus from "../../api/getMediaStatus";
export default function StatusFilter({ FilterType, dispatchFilter, state, className }) {

    const [dropDownActive, SetDropDown] = useState(false);
    const [AiringFilter, setStatusFilter] = useState(0);
    const [StatusCollection,SetStatusCollection] = useState([]);
    const searchInputRef = useRef();
    const selectRef = useRef();

    useEffect(() => {
        if (StatusCollection.length !== 0) return;
       var mediastatusData = localStorage.getItem("mediaStatus");
       if (mediastatusData) {
        SetStatusCollection([...JSON.parse(mediastatusData)]);
           return;
       }
       
       getStatus().then(data => {
           if(!data || !data.__type || !data.__type.enumValues) return;
           mediastatusData = data.__type.enumValues;
           localStorage.setItem("mediaStatus", JSON.stringify(mediastatusData));
           SetStatusCollection([...mediastatusData])
       });

   }, [StatusCollection])

    useEffect(() => {
        document.addEventListener("mouseup", HandleDropDwon);
        function HandleDropDwon(e) {
            if (!selectRef.current || !selectRef.current.contains(e.target))
            {
                let isDropdownActive = e.target.isSameNode(searchInputRef.current);
                SetDropDown(isDropdownActive);
                if(!isDropdownActive && state.mediastatus)
                {
                    setStatusFilter("");
                    searchInputRef.current.value = state.mediastatus?.toLowerCase().replace(RegExp("_","g")," ");
                }
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive,state.mediastatus])


    function handleClick(e) {
        let value = e.target.getAttribute("value") || e.target.closest("span[value]")?.getAttribute("value");
        if(value === null) return;
        dispatchFilter({ type: FilterType, payload: value });
        searchInputRef.current.value = value?.toLowerCase().replace(RegExp("_","g")," ");
        SetDropDown(false);
    }

    function handleInputChange(e) {
        setStatusFilter(e.target.value)
    }

    return (
        <div id="Year" className={joinClassName(className, "relative m-auto")}>
            <label className="block" htmlFor="Status">Airing Status</label>
            <input ref={searchInputRef} type="search" placeholder="Any" autoComplete="off" name="mediaStatus" onChange={handleInputChange} className="block  capitalize p-2  w-48 rounded outline-none bg-gray-100 text-primary-blue  drop-shadow-md" />
            {dropDownActive &&
                <SingleOptionDropdown ref={selectRef} handleClick={handleClick} filterValue={AiringFilter} selectedValue={state.status} GetData={()=>StatusCollection}/>
            }
        </div>

    )
}
