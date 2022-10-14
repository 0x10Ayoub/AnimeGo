
import React ,{useMemo} from "react";
import SingleOption from "./SingleOption";

function Dropdown({handleClick,yearFilter,selectedyear},ref) {

    const years = useMemo(yearGenerator, []);
    return (
        <div ref={ref} onClick={handleClick} className="mt-1 w-full  absolute max-h-96 h-fit scroll overflow-y-scroll bg-white text-gray-600">
            {
                years.filter(y => (!yearFilter || (y + "").includes(yearFilter)))
                    .map(y => <SingleOption key={y} value={y} isActiveBadge={Number(y) == Number(selectedyear)} />)
            }
        </div>
    )
}



function yearGenerator() {
    var startYear = 1950;
    var endYear = new Date().getFullYear() + 1;
    var res = new Array(endYear - startYear);
    for (let i = endYear, k = 0; i >= startYear; i--) {
        res[k++] = i;
    }
    return res;
}


const YearFilterDropdown = React.forwardRef(Dropdown) ;

export default YearFilterDropdown;