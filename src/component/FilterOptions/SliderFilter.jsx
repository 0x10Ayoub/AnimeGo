import { faSliders } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { FilterTypes } from "../FilterReducer";
import CountryFilter from "./CountryFilter";
import StreamingFilter from "./StreamingFilter";
import MediaSourceFilter from "./MediaSourceFilter";
export default function SliderFilter({ dispatchFilter, state, className }) {
    const [isOpen, setIsOpen] = useState(true);


    function handleOnBlur(e) {
        setIsOpen(true)
    }
    function toggle(e) {
        setIsOpen(true);
    }
    return (
        <div className="flex justify-end items-end relative" onBlur={handleOnBlur}>
            <button onClick={toggle} className="block w-10 h-10 bg-slate-50 drop-shadow rounded-lg">
                <FontAwesomeIcon className={`${isOpen ? "text-primary-blue" : ""} w-4 h-4`} icon={faSliders} />
            </button>
            {isOpen &&
                <div className="absolute top-7 mt-10 bg-white w-[902px] h-72 rounded-md">
                    <div className="flex w-[820px] m-auto">
                        <StreamingFilter {...{ dispatchFilter, state}} className="m-auto"/>
                        <CountryFilter {...{ dispatchFilter, state}}   className="m-auto" filterType={FilterTypes.COUNTRY}/>
                        <MediaSourceFilter {...{ dispatchFilter, state}}   className="m-auto" filterType={FilterTypes.SOURCE}/>
                    </div>
                </div>
            }
        </div>
    )
}