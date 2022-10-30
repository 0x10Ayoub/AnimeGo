 import { useEffect } from "react";

export default function useOnBlur(selectRef,callBack,isOpen){
    useEffect(() => {
        document.addEventListener("mouseup", HandleMouseup);
        function HandleMouseup(e) {
            if (isOpen) { 
                let isDropdownActive = selectRef.current.contains(e.target);
                callBack(isDropdownActive);
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleMouseup);
        }
    }, [isOpen,selectRef,callBack])
}
