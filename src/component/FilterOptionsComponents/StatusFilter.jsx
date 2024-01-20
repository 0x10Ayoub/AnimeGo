
import { useState, useEffect } from "react";
import getStatus from "../../api/getMediaStatus";
import DropdownInput from "../DropdownInput";

export function StatusFilter(props) {
    const [StatusCollection, SetStatusCollection] = useState([]);

    useEffect(() => {
        if (StatusCollection.length !== 0) return;
        var mediastatusData = localStorage.getItem("mediaStatus");
        if (mediastatusData) {
            SetStatusCollection([...JSON.parse(mediastatusData)]);
            return;
        }

        getStatus().then(data => {
            if (!data || !data.__type || !data.__type.enumValues) return;
            mediastatusData = data.__type.enumValues;
            localStorage.setItem("mediaStatus", JSON.stringify(mediastatusData));
            SetStatusCollection([...mediastatusData])
        });

    }, [StatusCollection])



    return (
        <DropdownInput {...props} getData={() => StatusCollection} title="Airing Status" inputClassName="shadow-none lg:bg-gray-200 xl:bg-white" />

    )
}
