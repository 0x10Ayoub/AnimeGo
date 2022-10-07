function joinClassName(className,addedClasses)
{
    var newClassName = className.split(" ");
    return [...newClassName,addedClasses].join(" ");
}

export {joinClassName};