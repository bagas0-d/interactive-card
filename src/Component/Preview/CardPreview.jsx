import PreviewFront from "./CardFront";
import PreviewBack from "./CardBack";

export default function Preview({data}) {
    return (
        <div className="">
            <PreviewFront data={data}/>
            <PreviewBack cvc={data.cvc}/>
        </div>
    )
}