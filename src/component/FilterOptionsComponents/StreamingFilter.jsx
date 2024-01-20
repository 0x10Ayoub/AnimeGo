import { useEffect, useState } from "react";
import MultiOptionDropdownInput from "../MultiOptionDropdownInput";
import { FilterTypes } from "../FilterReducer";
import getStreamingPlarforms from "../../api/getStreamingPlarforms";

export function StreamingFilter({ dispatchFilter, state, className }) {
    const [streamingCollection, setformatsCollection] = useState([]);

    useEffect(() => {
        if (streamingCollection.length !== 0) return;
        var StreamingData = localStorage.getItem("streams");
        if (StreamingData) {
            setformatsCollection([...JSON.parse(StreamingData)]);
            return;
        }

        getStreamingPlarforms().then(data => {
            if (!data || !data.ExternalLinkSourceCollection) return;
            StreamingData = data.ExternalLinkSourceCollection.map(item => item.site);

            localStorage.setItem("streams", JSON.stringify(StreamingData));
            setformatsCollection([...StreamingData])
        });

    }, [streamingCollection])


    return (

        <MultiOptionDropdownInput title="Streaming On" filterType={FilterTypes.STREAMS} dispatchFilter={dispatchFilter} data={state.streams} className={className}
            getData={() => streamingCollection} inputClassName="shadow-none lg:bg-gray-200"
        />
    )
}
