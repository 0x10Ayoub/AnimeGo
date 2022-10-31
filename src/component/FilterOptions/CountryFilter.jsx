import DropdownInput from "../DropdownInput";
export default function CountryFilter(props) {

    

    return (
        <DropdownInput  {...props} getData={getCountry}  title="Country Of origin" inputClassName="shadow-none lg:bg-gray-200"/>

    )
}

function getCountry(){
    return ["Japan","South Korea","China","Taiwan"]
}