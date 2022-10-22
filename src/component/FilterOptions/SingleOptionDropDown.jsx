
import React from "react";
import SingleOption from "./SingleOption";

function Dropdown({handleClick,filterValue,selectedValue,GetData},ref) {

    const collection = GetData();
    return (
        <div ref={ref} onClick={handleClick} className="mt-1 w-full  absolute max-h-96 h-fit scroll overflow-y-scroll bg-white text-gray-600">
            {
                collection.filter(current => (!filterValue || (current + "").includes(filterValue)))
                    .map(current => <SingleOption key={current} value={current} isActiveBadge={current == selectedValue} />)
            }
        </div>
    )
}

const SingleOptionDropdown = React.forwardRef(Dropdown);
export default SingleOptionDropdown;