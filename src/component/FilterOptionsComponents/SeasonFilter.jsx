
import DropdownInput from "../DropdownInput";

export function SeasonFilter(props) {
    return (
        <DropdownInput  {...props} getData={GetSeason} title="Season" />

    )
}

function GetSeason() {
    return ["Winter", "Spring", "Summer", "Fall"]
}