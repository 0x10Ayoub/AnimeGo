import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FilterTypes } from '../FilterReducer';
export default function ActivefilterCollection({ dispatchFilter, state }) {

    function handleClick(e) {
        let value = e.target.getAttribute("value") || e.target.closest("span[type]")?.getAttribute("value");
        if (value === null || value === undefined) return;
    }


    return (
        <div onClick={handleClick} className="w-full mt-5 text-left text-xs flex justify-start flex-wrap text-zinc-50 hover:cursor-pointer">
            <span key="icons-data-badges" className="w-4 h-4 m-1 mt-2" >
                <FontAwesomeIcon icon={faTags} className="text-gray-400 w-full h-full" />
            </span>
            {state.filterCollection.map(mapArrayAndsingleValue)}
        </div>
    )
    function mapArrayAndsingleValue (item) {
        let filter = item.toLowerCase();
        let data = state[filter];
     
        if([FilterTypes.GENRES,FilterTypes.TAGS,FilterTypes.FORMATS].includes(item))
            return data.map(val => <SingeBadge key={val} value={val} type={item} />)
        return <SingeBadge key={data+"-data"} value={data} type={item} />;
    }
    
}


function SingeBadge({ value, type, onClick, icon = faXmark }) {
    return (
        <span onClick={onClick} className="group block rounded-md capitalize m-1 p-1 bg-primary-blue" type={type} value={value}>
            {
                // value.replace(RegExp("_", "g",), " ").toLowerCase()
                value
            }
            <FontAwesomeIcon icon={icon} className="hidden group-hover:inline ml-1 w-3 h-3" />
        </span>);
}