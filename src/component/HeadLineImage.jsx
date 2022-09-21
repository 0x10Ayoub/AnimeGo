

export default function HeadLineImage({className,imageSource}) {

    return (
        <div className={className}>
            <div className="min-h-full min-w-full bg-local bg-center bg-no-repeat bg-cover" 
                style={{backgroundImage : `url(${imageSource})`}} >

                </div>
        </div>


    )
}