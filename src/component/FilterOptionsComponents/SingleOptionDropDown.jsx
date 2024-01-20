
import React from "react";
import SingleOption from "../SingleOption";
import { OperationTypes } from "../FilterReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";


function Dropdown({ handleOnClick, filterValue, selectedValue, getData, label = "label" }, ref) {

    const collection = getData();
    return (
        <div className="fixed z-50 flex flex-col justify-center top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-80
        md:absolute md:block md:rounded-md md:mt-2 md:bg-transparent md:h-96 md:top-[calc(100%+5px)]
        " >
            <div className=" p-1 flex justify-between  text-white ml-auto mr-auto mb-3 w-[90%] md:hidden">
                <span className="block font-base  text-lg font-600 uppercase text-gray-a-900">{label}</span>
                <FontAwesomeIcon className="block h-7" icon={faMinus} />
            </div>
            <div ref={ref} className="ml-auto mr-auto w-[90%] h-fit max-h-[60%] rounded-md  overflow-y-scroll bg-white text-gray-600
            lg:w-42 xl:w-48
            md:w-full  md:max-h-full  
            ">
                {
                    collection.filter(filterbyItemValue)
                        .map(mapItemValue)
                }
            </div>
        </div>

    )
    function filterbyItemValue(item) {
        var value = item.name ? item.name : item;

        return (!filterValue || (value + "").includes(filterValue));
    }

    function mapItemValue(item) {
        var value = item.name ? item.name : item;

        return <SingleOption key={value} onClick={(e) => {
            e.stopPropagation();
            handleOnClick(value, OperationTypes.UPDATE)
        }}
            value={value} isActiveBadge={value === selectedValue} />;
    }
}

//current => )

const SingleOptionDropdown = React.forwardRef(Dropdown);
export default SingleOptionDropdown;