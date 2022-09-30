export default  function SingleYear({year})
{
    return (
        <div value={year} className=" hover:cursor-pointer hover:text-cyan-400 hover:bg-slate-100">
            {year}
        </div>
    )
}