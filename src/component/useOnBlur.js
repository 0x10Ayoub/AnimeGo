 import { useEffect } from "react";

export default function useOnBlur(selectRef,callBack,isOpen,excludes=[]){
    useEffect(() => {
        document.addEventListener("mouseup", HandleMouseup);
        function HandleMouseup(e) {

            if (isOpen) { 
                let isEsclude = excludes.length != 0 && excludes.some(val => (val === e.target.id || e.target.closest("#"+val))); 
                if(isEsclude) return;
                console.log("hmmm")
                let isDropdownActive = selectRef.current.contains(e.target);
                callBack(isDropdownActive);
            }
        }
        return () => {
            document.removeEventListener("mouseup", HandleMouseup);
        }
    }, [isOpen,selectRef,callBack,excludes])
}
