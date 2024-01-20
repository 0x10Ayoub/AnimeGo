
import { useEffect, useRef, useState } from "react";
import getFormats from "../../api/getFormats";
import { joinClassName } from "../../utils/joinClassName";
import SingleOption from "../SingleOption";
import { FilterTypes, OperationTypes } from "../FilterReducer";
import BadgeCollection from "../SingleBadgeCollection";
import MultiOptionDropdownInput from "../MultiOptionDropdownInput";

export function FormatFilter({ dispatchFilter, state, className }) {
    const [formatsCollection, setformatsCollection] = useState([]);

    useEffect(() => {
        if (formatsCollection.length !== 0) return;
        var formatsData = localStorage.getItem("formats");
        if (formatsData) {
            setformatsCollection([...JSON.parse(formatsData)]);
            return;
        }

        getFormats().then(data => {
            if (!data || !data.__type || !data.__type.enumValues) return;
            formatsData = data.__type.enumValues;
            localStorage.setItem("formats", JSON.stringify(formatsData));
            setformatsCollection([...formatsData])
        });

    }, [formatsCollection])


    return (

        <MultiOptionDropdownInput title="Formats" filterType={FilterTypes.FORMATS} dispatchFilter={dispatchFilter} data={state.formats} className={className}
            getData={() => formatsCollection}
        />
    )
}



//formatsCollection.filter(item => (!formatsInputSearch || item.name.toLowerCase().includes(formatsInputSearch)))
//.map((item) => hanldeSingelOpetion(item.name, state.formats, handleClick))