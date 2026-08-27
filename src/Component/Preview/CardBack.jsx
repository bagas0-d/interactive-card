export default function PreviewBack({ cvc }) {
    return (
        <article className="card-back" aria-label="Card back preview">
            <p className="card-back__cvc">{cvc || "000"}</p>
        </article>
    );
}