import ActiveBadge from "./ActiveBadge"
export default  function SingleOption({value,onClick,isActiveBadge})
{
    return (
        <div   className="font-semibold  pl-3 pr-3">
            <div onClick={onClick} className="flex justify-start capitalize  hover:cursor-pointer hover:text-primary-blue hover:bg-slate-100 rounded">
                <span  className="block mb-1 p-1 text-left pl-4 w-full h-full">{value?.toString().toLowerCase().replace("_"," ")}</span>
                { isActiveBadge && <ActiveBadge />}
            </div>
        </div>
    )
}