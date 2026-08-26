export default function Form({data, errors, handleErrors, handleData}) {

    const validasi = (data) => {
        const errors = {};

        // name
        if (!data.name.trim()) {
            errors.name = {
                type: "required",
                message: "Nama wajib diisi",
            };
        }

        // cardNumber
        if (!data.cardNumber.trim()) {
            errors.cardNumber = {
                type: "required",
                message: "Card number is required",
            };
        } else if (data.cardNumber.length !== 16) {
            errors.cardNumber = {
                type: "invalid_length",
                message: "Card number must be 16 characters",
            };
        }

        // cvc
        if (!data.cvc.trim()) {
            errors.cvc = {
                type: "required",
                message: "CVC is required",
            };
        } else if (data.cvc.length !== 3) {
            errors.cvc = {
                type: "invalid_length",
                message: "CVC must be 3 characters",
            };
        }

        // expiry
        const expiryError = validateExpiryDate(
            data.expMonth,
            data.expYear
        );

        if (expiryError) {
            errors.expiry = expiryError;
        }

        return errors;
    };

    const validateExpiryDate = (month, year) => {
        // kosong
        if (!month || !year) {
            return {
                type: "required",
                message: "Expiry date is required",
            };
        }

        // month harus 01-12
        if (
            !/^\d{2}$/.test(month) ||
            Number(month) < 1 ||
            Number(month) > 12
        ) {
            return {
                type: "invalid_month",
                message: "Invalid expiry month",
            };
        }

        // year harus 2 digit
        if (!/^\d{2}$/.test(year)) {
            return {
                type: "invalid_year",
                message: "Invalid expiry year",
            };
        }

        // cek expired
        const now = new Date();

        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        const expiryYear = 2000 + Number(year);
        const expiryMonth = Number(month);

        if (
            expiryYear < currentYear ||
            (expiryYear === currentYear && expiryMonth < currentMonth)
        ) {
            return {
                type: "expired",
                message: "Card has expired",
            };
        }

        return null;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validasi(data);

        handleErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        handleData("isSubmit", true);
    };

    return (
        <form
        onSubmit={handleSubmit}>
            <div className="name">
                <label htmlFor="name">CardHolder Name</label>
                <input 
                onChange={(e) => handleData("name", e.target.value)}
                type="text" id="name" placeholder="e.g. Jane Appleseed"/>
                <p className={`${errors.name
                    ? ""
                    : "hidden"
                }`}>{errors.name?.message}</p>
            </div>

            <div className="cardNumber">
                <label htmlFor="cardNumber">Card Number</label>
                <input 
                onChange={(e) => handleData("cardNumber", e.target.value)}
                type="text" inputMode="numeric" id="cardNumber" placeholder="e.g. 1234 5678 9123 0000"/>
                <p className={`${errors.cardNumber
                    ? ""
                    : "hidden"
                }`}>{errors.cardNumber?.message}</p>
            </div>

            <div className="">
                <div className="expired">
                    <label htmlFor="">Exp. Date (MM/YY)</label>
                    <input 
                    onChange={(e) => handleData("expMonth", e.target.value)}
                    type="text" id="month" inputMode="numeric" placeholder="MM"/>
                    <input 
                    onChange={(e) => handleData("expYear", e.target.value)}
                    type="text" id="year" inputMode="numeric" placeholder="YY"/>
                    <p className={`${errors.expiry
                        ? ""
                        : "hidden"
                    }`}>{errors.expiry?.message}</p>
                </div>

                <div className="">
                    <label htmlFor="cvc">CVC</label>
                    <input 
                    onChange={(e) => handleData("cvc", e.target.value)}
                    type="text" id="cvc" placeholder="e.g. 123"/>
                    <p className={`${errors.cvc
                        ? ""
                        : "hidden"
                    }`}>{errors.cvc?.message}</p>
                </div>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}