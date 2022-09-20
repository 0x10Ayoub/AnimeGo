

export default function HeadLineImage({className,imageSource}) {

    return (
        <div className={className}>
            <div className="min-h-full min-w-full bg-local bg-center " 
                style={{backgroundImage : `url(${imageSource})`,boxShadow : "-12px 0px 95px 53px rgba(0, 9, 36, 0.74) inset"}} >

                </div>
        </div>


    )
}