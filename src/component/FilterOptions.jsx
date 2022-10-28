import { useReducer } from "react"
import OpenSearch from "./filterOptions/OpenSearch"
import { INITIAL_STATE, filterReducer, FilterTypes } from "./FilterReducer"
import YearsFilter from "./filterOptions/YearsFilter";
import GenresFilter from "./filterOptions/GenresFilter";
import SeasonFilter from "./filterOptions/SeasonFilter";
import FormatFilter from "./filterOptions/FormatFilter";
import StatusFilter from "./filterOptions/StatusFilter";
import ActivefilterCollection from "./filterOptions/ActivefilterCollection";
import SliderFilter from "./filterOptions/SliderFilter";

export default function FilterOption() {
    const [state, dispatchFilter] = useReducer(filterReducer, INITIAL_STATE);

    return (
        <div className="container  m-auto mt-10">
            <div className="flex">
                <OpenSearch  className="" dispatchFilter={dispatchFilter} state={state}/>
                <GenresFilter className="" FilterType={FilterTypes.GENRES} dispatchFilter={dispatchFilter} state={state}/>
                <YearsFilter className="" filterType={FilterTypes.YEAR} dispatchFilter={dispatchFilter} state={state}/>
                <SeasonFilter className="" filterType={FilterTypes.SEASON} dispatchFilter={dispatchFilter} state={state}/>
                <FormatFilter className="" FilterType={FilterTypes.FORMATS} dispatchFilter={dispatchFilter} state={state}/>
                <StatusFilter className="" filterType={FilterTypes.STATUS} dispatchFilter={dispatchFilter} state={state}/>
                <SliderFilter className="" dispatchFilter={dispatchFilter} state={state}/>
            </div>
            <ActivefilterCollection  FilterType={""} dispatchFilter={dispatchFilter} state={state}/>
        </div>
    )
}