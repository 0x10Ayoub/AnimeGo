

export default function BadgeCollection({collection,onClick}){
    if(!collection || collection.length === 0)
        return(<></>)
    return (
        <div data-value="" className="absolute  h-full top-0 left-0 text-left text-sm flex  items-start text-gray-800 hover:cursor-pointer">
                { collection.length !== 0 &&
                   <span className="block rounded-md m-1 p-1 bg-slate-300 " onClick={onClick} value={collection[0]} >{collection[0]}</span> }
                { collection.length - 1 > 0 &&
                    <span className="block rounded-lg m-1 p-1 bg-slate-300 " >+{collection.length - 1}</span> 
                }
        </div>
    )

}