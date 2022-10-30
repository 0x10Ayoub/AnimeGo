import { faSliders } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function OtherFilters({ onClick,isOpen }) {
    return (
        <div className="flex justify-end items-end relative m-2">
            <button onClick={onClick} className="block w-10 h-10 bg-slate-50 drop-shadow rounded-lg">
                <FontAwesomeIcon className={`${isOpen ? "text-primary-blue" : ""} w-4 h-4`} icon={faSliders} />
            </button>
        </div>
    )
}