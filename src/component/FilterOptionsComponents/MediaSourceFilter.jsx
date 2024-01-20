
import { useState, useEffect } from "react";
import getMediaSource from "../../api/getMediaSource";
import DropdownInput from "../DropdownInput";

export function MediaSourceFilter(props) {
    const [SourceCollection, SetStatusCollection] = useState([]);

    useEffect(() => {
        if (SourceCollection.length !== 0) return;
        var mediastatusData = localStorage.getItem("mediaSource");
        if (mediastatusData) {
            SetStatusCollection([...JSON.parse(mediastatusData)]);
            return;
        }

        getMediaSource().then(data => {
            if (!data || !data.__type || !data.__type.enumValues) return;
            mediastatusData = data.__type.enumValues;
            localStorage.setItem("mediaSource", JSON.stringify(mediastatusData));
            SetStatusCollection([...mediastatusData])
        });

    }, [SourceCollection])



    return (
        <DropdownInput {...props} getData={() => SourceCollection} title="Media Source" inputClassName="shadow-none lg:bg-gray-200" />

    )
}