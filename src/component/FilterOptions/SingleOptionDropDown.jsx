
import React from "react";
import SingleOption from "../SingleOption";
import { OperationTypes } from "../FilterReducer";
function Dropdown({handleOnClick,filterValue,selectedValue,getData},ref) {

    const collection = getData();
    return (
        <div ref={ref}  className="mt-1 w-full  absolute max-h-96 h-fit scroll overflow-y-scroll bg-white text-gray-600">
            {
                collection.filter(filterNameOrValue)
                    .map(mapNameOrValue)
            }
        </div>
    )
    function filterNameOrValue(item) {
        var value = item.name ? item.name : item;
       
        return (!filterValue || (value + "").includes(filterValue));
    }

    function mapNameOrValue(item) {
        var value = item.name ? item.name : item;
       
        return <SingleOption key={value} onClick={()=>{handleOnClick(value,OperationTypes.UPDATE)}} value={value} isActiveBadge={value === selectedValue} />;
    }
}

//current => )

const SingleOptionDropdown = React.forwardRef(Dropdown);
export default SingleOptionDropdown;