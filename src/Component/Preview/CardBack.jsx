export default function PreviewBack({cvc}) {
    return(
        <div className="">
            <img src="bg-card-back.png" alt="" className="bg-image"/>

            <p className="cvc">{cvc || "000"}</p>
        </div>
    )
}