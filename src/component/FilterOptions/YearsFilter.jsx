
import React from "react";
import DropdownInput from "../DropdownInput"


export default function YearsFilter(props) {

   
    return (
        
        <DropdownInput  {...props} getData={yearGenerator}/>
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



