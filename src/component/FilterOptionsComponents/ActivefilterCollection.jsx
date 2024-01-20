import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FilterTypes, OperationTypes } from '../FilterReducer';


export function ActivefilterCollection({ dispatchFilter, state }) {

    function handleClick(type, payload) {
        if ([FilterTypes.FORMATS, FilterTypes.GENRES, FilterTypes.STREAMS].includes(type))
            dispatchFilter({ type, payload, operation: OperationTypes.DELETE })
        else
            dispatchFilter({ type, payload: "", operation: OperationTypes.UPDATE })
    }


    return (
        <div className="w-full mt-5 text-left text-xs flex justify-start flex-wrap text-zinc-50 hover:cursor-pointer">
            <span key="icons-data-badges" className="w-4 h-4 m-1 mt-2" >
                <FontAwesomeIcon icon={faTags} className="text-gray-400 w-full h-full" />
            </span>
            {state.filterCollection.map(mapArrayAndsingleValue)}
        </div>
    )

    function mapArrayAndsingleValue(item) {
        let filter = item.toLowerCase();
        let data = state[filter];

        if ([FilterTypes.GENRES, FilterTypes.FORMATS, FilterTypes.STREAMS].includes(item))
            return data.map(val => <SingleBadge onClick={() => handleClick(item, val)} key={val} value={val} />)
        return <SingleBadge onClick={() => handleClick(item, data)} key={data + "-data"} value={data} />;
    }

}


function SingleBadge({ value, onClick, icon = faXmark }) {
    return (
        <span onClick={onClick} className="group block rounded-md capitalize m-1 p-1 bg-primary-blue" value={value}>
            {
                value?.toString().replace(RegExp("_", "g",), " ").toLowerCase()
            }
            <FontAwesomeIcon icon={icon} className="hidden group-hover:inline ml-1 w-3 h-3" />
        </span>);
}