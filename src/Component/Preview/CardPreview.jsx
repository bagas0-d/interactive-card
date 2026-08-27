import PreviewFront from "./CardFront";
import PreviewBack from "./CardBack";

export default function Preview({data}) {
    return (
        <div className="absolute inset-x-0 top-0 z-10 h-75 w-full md:inset-y-0 md:right-auto md:h-screen md:w-[33.54vw]">
            <div className="absolute left-4 top-31.5 z-20 md:left-[33.95%] md:top-[20.78vh]">
                <PreviewFront data={data}/>
            </div>
            <div className="absolute left-1/2 top-8 z-10 -translate-x-1/2 md:left-[53.42%] md:top-[52.1vh] md:translate-x-0">
                <PreviewBack cvc={data.cvc}/>
            </div>
        </div>
    )
}