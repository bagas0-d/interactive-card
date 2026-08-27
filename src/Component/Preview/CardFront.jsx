import cardLogo from "../../assets/images/card-logo.svg";

export default function PreviewFront({ data }) {
    return (
        <article className="card-front" aria-label="Card front preview">
            <img className="card-front__logo" src={cardLogo} alt="" />

            <div className="card-front__details">
                <p className="card-front__number">
                    {data.cardNumber.replace(/(.{4})(?=.{4})/g, "$1 ") ||
                        "0000 0000 0000 0000"}
                </p>

                <div className="card-front__footer">
                    <p className="card-front__name">{data.name || "John Doe"}</p>
                    <p className="card-front__expiry">
                        {data.expMonth.padStart(2, "0") || "00"}/
                        {data.expYear.padStart(2, "0") || "00"}
                    </p>
                </div>
            </div>
        </article>
    );
}