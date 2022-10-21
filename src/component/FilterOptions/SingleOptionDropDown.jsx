
import React from "react";
import SingleOption from "./SingleOption";

function Dropdown({handleClick,filterValue,selectedValue,GetData},ref) {

    const years = GetData();
    return (
        <div ref={ref} onClick={handleClick} className="mt-1 w-full  absolute max-h-96 h-fit scroll overflow-y-scroll bg-white text-gray-600">
            {
                years.filter(y => (!filterValue || (y + "").includes(filterValue)))
                    .map(y => <SingleOption key={y} value={y} isActiveBadge={Number(y) == Number(selectedValue)} />)
            }
        </div>
    )
}

const SingleOptionDropdown = React.forwardRef(Dropdown);
export default SingleOptionDropdown;