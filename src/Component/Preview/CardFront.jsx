export default function PreviewFront({data}) {
    return (
        <div className="">
            <img src="src/assets/images/bg-card-front.png" alt="" className="bg-image"/>

            <img src="src/assets/images/card-logo.svg" alt="" />
            
            <div className="">
                <div className="cardNumber">{
                data.cardNumber.replace(/(.{4})(?=.{4})/g, '$1 ') || 
                "0000 0000 0000 0000"}</div>

                <div className="container">
                    <p className="name">{data.name || "John Doe"}</p>
                    <p className="exp">{data.expMonth.padStart(2, "0") || "00"}/{data.expYear.padStart(2, "0") || "00"}</p>
                </div>
            </div>
        </div>
    )
}