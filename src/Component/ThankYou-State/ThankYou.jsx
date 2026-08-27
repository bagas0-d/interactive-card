import completeIcon from "../../assets/images/icon-complete.svg";

export default function ThankYou() {
    return (
        <section className="thank-you" aria-labelledby="thank-you-title">
            <img className="thank-you__icon" src={completeIcon} alt="" />

            <h1 id="thank-you-title">Thank You</h1>

            <p className="thank-you__message">We've added your card details</p>

            <button className="thank-you__button"><a href="/">Continue</a></button>
        </section>
    );
}