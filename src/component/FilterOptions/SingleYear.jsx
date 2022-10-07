export default  function SingleYear({value,ActiveBadge})
{
    return (
        <div   value={value} className=" flex justify-start hover:cursor-pointer hover:text-cyan-400 hover:bg-slate-100">
            <span className="block text-left ml-2">{value}</span>
            { ActiveBadge && <ActiveBadge />}
        </div>
    )
}