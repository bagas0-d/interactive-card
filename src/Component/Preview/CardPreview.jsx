import PreviewFront from "./CardFront";
import PreviewBack from "./CardBack";

export default function Preview({data}) {
    return (
        <div className="absolute inset-x-0 top-0 z-10 h-75 w-full lg:inset-y-0 lg:right-auto lg:h-screen lg:w-[33.54vw]"> 
            <div className="absolute left-[4.27%] top-31.5 z-20 sm:left-[25%] lg:left-[33.95%] lg:top-[20.78vh]"> <PreviewFront data={data}/> 
            </div> 
            <div className="absolute left-[20%] top-8 z-10 sm:left-[40%] lg:left-[53.42%] lg:top-[52.1vh]"> <PreviewBack cvc={data.cvc}/> 
            </div> 
        </div>
    )
}   