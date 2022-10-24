import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'
export default function FilterTagsCollection({dispatchFilter,state}){

    function handleClick(e) {
        let value = e.target.getAttribute("value") || e.target.closest("span[type]")?.getAttribute("value");
        if(value === null || value === undefined  ) return;
    }


    return (
        <div  onClick={handleClick} className="w-full mt-5 text-left text-sm flex justify-start flex-wrap text-zinc-50 hover:cursor-pointer">
            {
                mapWithKey(state.filterCollection)
            }
        </div>
    )
}

function mapWithKey(hash){
    var res  = [];
    res.push(<span key="icons-data-badges" className="w-4 h-4" ><FontAwesomeIcon icon={faTags} className="text-gray-400 w-full h-full" /></span>)
    for(let key in hash){
       res.push( <SingeBadge key={key} value={key} type={hash[key]}/>)
    }
    return res;
}

function SingeBadge({value,type}){
    return (
    <span  className="block rounded-md capitalize m-1 p-1 bg-primary-blue" type={type} value={value}>
        {
            value.replace(RegExp("_","g",)," ").toLowerCase()
        }
    </span>);
}