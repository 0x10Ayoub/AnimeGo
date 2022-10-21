function getParentValueAttribute(target,attrValue,upwardDepth=1){
        let node = target;
        while(upwardDepth >= 0){
            node = node.parentNode;
            console.log(node)
            let value = node?.getAttribute(attrValue); 
            if(value)
                return value;

            upwardDepth--;
        }
    return node?.getAttribute(attrValue)
}

export{getParentValueAttribute};