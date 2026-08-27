const normalizeCardNumber = (value) => value.replace(/\s/g, "");

const normalizeDigits = (value, maxLength) =>
    value.replace(/\D/g, "").slice(0, maxLength);

const validateName = (name) => {
    const normalizedName = name.trim();

    if (!normalizedName) {
        return {
            type: "required",
            message: "Nama wajib diisi",
        };
    }

    if (!/^[\p{L}]+(?:[ .'-][\p{L}]+)*$/u.test(normalizedName)) {
        return {
            type: "invalid_format",
            message: "Please enter a valid name",
        };
    }

    return null;
};

const validateCardNumber = (cardNumber) => {
    const normalizedNumber = normalizeCardNumber(cardNumber);

    if (!normalizedNumber) {
        return {
            type: "required",
            message: "Card number is required",
        };
    }

    if (!/^\d+$/.test(normalizedNumber)) {
        return {
            type: "invalid_format",
            message: "Wrong format, numbers only",
        };
    }

    if (normalizedNumber.length !== 16) {
        return {
            type: "invalid_length",
            message: "Card number must be 16 digits",
        };
    }

    return null;
};

const validateCvc = (cvc) => {
    if (!cvc) {
        return {
            type: "required",
            message: "CVC is required",
        };
    }

    if (!/^\d+$/.test(cvc)) {
        return {
            type: "invalid_format",
            message: "Wrong format, numbers only",
        };
    }

    if (cvc.length !== 3) {
        return {
            type: "invalid_length",
            message: "CVC must be 3 digits",
        };
    }

    return null;
};

const validateExpiryDate = (month, year) => {
    if (!month) {
        return {
            type: "required_month",
            message: "Expiry month is required",
        };
    }

    if (!/^\d+$/.test(month) || month.length !== 2) {
        return {
            type: "invalid_month",
            message: "Invalid month",
        };
    }

    if (Number(month) < 1 || Number(month) > 12) {
        return {
            type: "invalid_month",
            message: "Invalid month",
        };
    }

    if (!year) {
        return {
            type: "required_year",
            message: "Expiry year is required",
        };
    }

    if (!/^\d{2}$/.test(year)) {
        return {
            type: "invalid_year",
            message: "Invalid year",
        };
    }

    const now = new Date();
    const expiryYear = 2000 + Number(year);
    const expiryMonth = Number(month);

    if (
        expiryYear < now.getFullYear() ||
        (expiryYear === now.getFullYear() && expiryMonth < now.getMonth() + 1)
    ) {
        return {
            type: "expired",
            message: "Card has expired",
        };
    }

    return null;
};

export default function Form({data, errors, handleErrors, handleData}) {

    const validasi = (data) => {
        const errors = {};

        const nameError = validateName(data.name);
        const cardNumberError = validateCardNumber(data.cardNumber);
        const cvcError = validateCvc(data.cvc);
        const expiryError = validateExpiryDate(data.expMonth, data.expYear);

        if (nameError) errors.name = nameError;
        if (cardNumberError) errors.cardNumber = cardNumberError;
        if (cvcError) errors.cvc = cvcError;
        if (expiryError) errors.expiry = expiryError;

        return errors;
    };

    const handleFieldChange = (field, value) => {
        const nextData = {...data, [field]: value};
        const nextErrors = {...errors};
        let fieldError;

        if (field === "name") fieldError = validateName(value);
        if (field === "cardNumber") fieldError = validateCardNumber(value);
        if (field === "cvc") fieldError = validateCvc(value);
        if (field === "expMonth" || field === "expYear") {
            fieldError = validateExpiryDate(nextData.expMonth, nextData.expYear);
        }

        const errorKey = field === "expMonth" || field === "expYear" ? "expiry" : field;
        if (errors[errorKey]) {
            if (fieldError) nextErrors[errorKey] = fieldError;
            else delete nextErrors[errorKey];
            handleErrors(nextErrors);
        }

        handleData(field, value);
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
            className="absolute left-1/2 top-83.5 z-20 grid w-[calc(100%-48px)] max-w-95.25 -translate-x-1/2 gap-5 font-space text-purple-950 lg:left-[57.78vw] lg:top-[31vh] lg:w-95.25 lg:translate-x-0"
            onSubmit={handleSubmit}
        >
            <div>
                <label className="block text-[0.6875rem] font-medium uppercase tracking-[0.18em]" htmlFor="name">
                    CardHolder Name
                </label>
                <input
                    className={`mt-2 h-11.25 w-full rounded-lg border bg-white px-4 text-lg font-medium text-purple-950 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${errors.name ? "border-red-400" : "border-gray-200"}`}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
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
                    onChange={(e) => handleFieldChange("cardNumber", normalizeDigits(e.target.value, 16))}
                    type="text"
                    inputMode="numeric"
                    id="cardNumber"
                    maxLength={16}
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
                            onChange={(e) => handleFieldChange("expMonth", normalizeDigits(e.target.value, 2))}
                            type="text"
                            id="month"
                            inputMode="numeric"
                            maxLength={2}
                            placeholder="MM"
                            aria-invalid={Boolean(errors.expiry)}
                            aria-describedby={errors.expiry ? "expiry-error" : undefined}
                        />
                        <input
                            className={`h-11.25 min-w-0 rounded-lg border bg-white px-3 text-lg font-medium text-purple-950 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${errors.expiry ? "border-red-400" : "border-gray-200"}`}
                            onChange={(e) => handleFieldChange("expYear", normalizeDigits(e.target.value, 2))}
                            type="text"
                            id="year"
                            inputMode="numeric"
                            maxLength={2}
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
                        onChange={(e) => handleFieldChange("cvc", normalizeDigits(e.target.value, 3))}
                        type="text"
                        id="cvc"
                        placeholder="e.g. 123"
                        maxLength={3}
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