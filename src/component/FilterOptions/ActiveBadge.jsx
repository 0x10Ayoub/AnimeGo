import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
export default function ActiveBadge({value=""}) {
    return (
        <span value = {value} className="block m-auto mr-5 text-right"><FontAwesomeIcon className="text-primary-blue" icon={faCircleCheck} /></span>
    );
}