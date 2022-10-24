
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
    res.push(<span key="icons-data-badges">Icon</span>)
    for(let key in hash){
       res.push( <SingeBadge key={key} value={key} type={hash[key]}/>)
    }
    return res;
}

function SingeBadge({key,value,type}){
    return (
    <span key={key} className="block rounded-md capitalize m-1 p-1 bg-primary-blue" type={type} value={value}>
        {
            value.replace(RegExp("_","g",)," ").toLowerCase()
        }
    </span>);
}