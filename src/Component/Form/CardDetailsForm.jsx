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
            className="absolute left-6 top-83.5 z-20 grid w-[calc(100%-48px)] max-w-95.25 gap-5 font-space text-purple-950 md:left-[57.78vw] md:top-[31vh] md:w-95.25"
            onSubmit={handleSubmit}
        >
            <div>
                <label className="block text-[0.6875rem] font-medium uppercase tracking-[0.18em]" htmlFor="name">
                    CardHolder Name
                </label>
                <input
                    className={`mt-2 h-11.25 w-full rounded-lg border bg-white px-4 text-lg font-medium text-purple-950 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${errors.name ? "border-red-400" : "border-gray-200"}`}
                    onChange={(e) => handleData("name", e.target.value)}
                    type="text"
                    id="name"
                    placeholder="e.g. John Doe"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                />
                <p id="name-error" className={`mt-2 text-xs text-red-400 ${errors.name ? "" : "hidden"}`}>
                    {errors.name?.message}
                </p>
            </div>

            <div>
                <label className="block text-[0.6875rem] font-medium uppercase tracking-[0.18em]" htmlFor="cardNumber">
                    Card Number
                </label>
                <input
                    className={`mt-2 h-11.25 w-full rounded-lg border bg-white px-4 text-lg font-medium text-purple-950 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${errors.cardNumber ? "border-red-400" : "border-gray-200"}`}
                    onChange={(e) => handleData("cardNumber", e.target.value)}
                    type="text"
                    inputMode="numeric"
                    id="cardNumber"
                    maxlength={16}
                    placeholder="e.g. 1234 5678 9123 0000"
                    aria-invalid={Boolean(errors.cardNumber)}
                    aria-describedby={errors.cardNumber ? "card-number-error" : undefined}
                />
                <p id="card-number-error" className={`mt-2 text-xs text-red-400 ${errors.cardNumber ? "" : "hidden"}`}>
                    {errors.cardNumber?.message}
                </p>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3">
                <div>
                    <label className="block text-[0.6875rem] font-medium uppercase tracking-[0.18em]" htmlFor="month">
                        Exp. Date (MM/YY)
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <input
                            className={`h-11.25 min-w-0 rounded-lg border bg-white px-3 text-lg font-medium text-purple-950 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${errors.expiry ? "border-red-400" : "border-gray-200"}`}
                            onChange={(e) => handleData("expMonth", e.target.value)}
                            type="text"
                            id="month"
                            inputMode="numeric"
                            maxlength={2}
                            placeholder="MM"
                            aria-invalid={Boolean(errors.expiry)}
                            aria-describedby={errors.expiry ? "expiry-error" : undefined}
                        />
                        <input
                            className={`h-11.25 min-w-0 rounded-lg border bg-white px-3 text-lg font-medium text-purple-950 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${errors.expiry ? "border-red-400" : "border-gray-200"}`}
                            onChange={(e) => handleData("expYear", e.target.value)}
                            type="text"
                            id="year"
                            inputMode="numeric"
                            maxlength={2}
                            placeholder="YY"
                            aria-invalid={Boolean(errors.expiry)}
                            aria-describedby={errors.expiry ? "expiry-error" : undefined}
                        />
                    </div>
                    <p id="expiry-error" className={`mt-2 text-xs text-red-400 ${errors.expiry ? "" : "hidden"}`}>
                        {errors.expiry?.message}
                    </p>
                </div>

                <div>
                    <label className="block text-[0.6875rem] font-medium uppercase tracking-[0.18em]" htmlFor="cvc">
                        CVC
                    </label>
                    <input
                        className={`mt-2 h-11.25 w-full rounded-lg border bg-white px-3 text-lg font-medium text-purple-950 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${errors.cvc ? "border-red-400" : "border-gray-200"}`}
                        onChange={(e) => handleData("cvc", e.target.value)}
                        type="text"
                        id="cvc"
                        placeholder="e.g. 123"
                        maxlength={3}
                        inputMode="numeric"
                        aria-invalid={Boolean(errors.cvc)}
                        aria-describedby={errors.cvc ? "cvc-error" : undefined}
                    />
                    <p id="cvc-error" className={`mt-2 text-xs text-red-400 ${errors.cvc ? "" : "hidden"}`}>
                        {errors.cvc?.message}
                    </p>
                </div>
            </div>

            <button
                className="h-13.5 w-full rounded-lg bg-purple-950 px-4 text-lg font-medium text-white transition-colors hover:bg-purple-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                type="submit"
            >
                Submit
            </button>
        </form>
    )
}