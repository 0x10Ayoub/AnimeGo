import { useEffect, useState } from "react";
import getGenresCollection from "../../api/getGenresCollection";
import { FilterTypes } from "../FilterReducer";
import MultiOptionDropdownInput from "../MultiOptionDropdownInput";


export function GenresFilter({ dispatchFilter, state, className }) {
    const [genresCollection, setGenresCollection] = useState(null);

    useEffect(() => {
        if (genresCollection !== null) return;
        var genres = localStorage.getItem("genres");
        if (genres) {
            setGenresCollection(JSON.parse(genres));
            return;
        }
        getGenresCollection().then(data => {
            if (!data) return;
            var genres = data;
            localStorage.setItem("genres", JSON.stringify(genres));
            setGenresCollection(genres)
        });

    }, [genresCollection])





    return (
        <MultiOptionDropdownInput filterType={FilterTypes.GENRES} title="Genres"
            dispatchFilter={dispatchFilter} data={state.genres} className={className}
            getData={() => genresCollection}
        />
    )

}





