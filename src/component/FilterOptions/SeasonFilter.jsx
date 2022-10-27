
import DropdownInput from "../DropdownInput";
export default function SeasonFilter(props) {

    

    return (
        <DropdownInput  {...props} getData={GetSeason} />

    )
}

function GetSeason(){
    return ["Winter","Spring","Summer","Fall"]
}