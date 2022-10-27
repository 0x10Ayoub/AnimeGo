
import { useEffect, useRef, useState } from "react";
import getFormats from "../../api/getFormats";
import { joinClassName } from "../../utils/joinClassName";
import SingleOption from "./SingleOption";
import { FilterTypes, OperationTypes } from "../FilterReducer";
import BadgeCollection from "./SingleBadgeCollection";

export default function FormatFilter({ dispatchFilter, state, className }) {

    const [dropDownActive, SetDropDown] = useState(false);
    const [formatsInputSearch, setFormatsInputSearch] = useState("");
    const [formatsCollection, setformatsCollection] = useState([]);
    const [isSearchActive, setIsSearchAtive] = useState(false)
    const searchInputRef = useRef();
    const selectRef = useRef();

    useEffect(() => {
        if (formatsCollection.length !== 0) return;
        var formatsData = localStorage.getItem("formats");
        if (formatsData) {
            setformatsCollection([...JSON.parse(formatsData)]);
            return;
        }

        getFormats().then(data => {
            if (!data || !data.__type || !data.__type.enumValues) return;
            formatsData = data.__type.enumValues;
            localStorage.setItem("formats", JSON.stringify(formatsData));
            setformatsCollection([...formatsData])
        });

    }, [formatsCollection])

    useEffect(() => {
        document.addEventListener("mouseup", HandleDropDwon);
        function HandleDropDwon(e) {
            let target = e.target;
            if (!selectRef.current || !selectRef.current.contains(target)) {

                let isDropdownActive = target.isSameNode(searchInputRef.current) ||
                    searchInputRef.current.parentNode === target.closest("div[data-value]")?.parentNode;
                setIsSearchAtive(target.isSameNode(searchInputRef.current))
                SetDropDown(isDropdownActive);
                if (!isDropdownActive && state.formats.length)
                    setIsSearchAtive(false);
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleDropDwon);
        }
    }, [dropDownActive, state.formats])


    function handleClick(payload, operation) {
        let type = FilterTypes.FORMATS;
        dispatchFilter({ type, payload, operation });
        setFormatsInputSearch("");
        setIsSearchAtive(false);
    }

    function setFormatsSearch(e) {
        setFormatsInputSearch(e.target.value)
    }
    return (
        <div className={joinClassName(className, "relative m-auto")}>
            <label className="block" htmlFor="Format">Format</label>
            <div className="relative">
                <input ref={searchInputRef} type="search" placeholder={state.formats?.length ? " " : "Any"} autoComplete="off" name="Format" onChange={setFormatsSearch} className="block p-2  w-48 rounded outline-none bg-gray-100 drop-shadow-md" />
                {
                    !isSearchActive && <BadgeCollection collection={state.formats} onClick={() => handleClick(state.formats[0], OperationTypes.DELETE)} />
                }
            </div>
            {dropDownActive &&
                <div ref={selectRef} className="mt-1 w-full  absolute max-h-96 h-fit scroll overflow-y-scroll bg-white text-gray-600">
                    {
                        formatsCollection.filter(item => (!formatsInputSearch || item.name.toLowerCase().includes(formatsInputSearch)))
                            .map((item) => hanldeSingelOpetion(item.name, state.formats, handleClick))
                    }

                </div>
            }
        </div>

    )
}

function hanldeSingelOpetion(value, arr, handleClick) {
    let selected = arr.includes(value);
    let operation = selected ? OperationTypes.DELETE : OperationTypes.ADD;
    return (
        <SingleOption onClick={() => handleClick(value, operation)} key={value} value={value} isActiveBadge={selected} />
    )
}


