export default  function SingleYear({value,ActiveBadge})
{
    return (
        <div   className="font-semibold  pl-3 pr-3">
            <div value={value} className="p-1 flex justify-start hover:cursor-pointer hover:text-cyan-400 hover:bg-slate-100 rounded">
                <span className="block text-left ml-5">{value}</span>
                { ActiveBadge && <ActiveBadge />}
            </div>
        </div>
    )
}