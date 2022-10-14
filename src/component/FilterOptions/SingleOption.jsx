import ActiveBadge from "./ActiveBadge"
export default  function SingleOption({value,isActiveBadge})
{
    return (
        <div   className="font-semibold  pl-3 pr-3">
            <div className="flex justify-start hover:cursor-pointer hover:text-cyan-400 hover:bg-slate-100 rounded">
                <span value={value} className="block p-1 text-left pl-5 w-full h-full">{value}</span>
                { isActiveBadge && <ActiveBadge />}
            </div>
        </div>
    )
}