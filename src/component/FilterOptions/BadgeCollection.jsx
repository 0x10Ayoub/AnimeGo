

export default function BadgeCollection({collection}){
    if(!collection || collection.length === 0)
        return(<></>)
    return (
        <div className="absolute w-full h-full top-0 left-0 text-left text-sm flex  items-start text-gray-800 ">
                { collection.length !== 0 &&
                   <span className="block rounded-md m-1 p-1 bg-slate-300" >{collection[0]}</span> }
                { collection.length - 1 > 0 &&
                    <span className="block rounded-lg m-1 p-1 bg-slate-300 " >+{collection.length - 1}</span> 
                }
        </div>
    )

}