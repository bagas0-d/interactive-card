import { useState } from "react";
import Form from "./Component/Form/CardDetailsForm";
import Preview from "./Component/Preview/CardPreview";
import ThankYou from "./Component/ThankYou-State/ThankYou";
import desktopBackground from "./assets/images/bg-main-desktop.png";
import mobileBackground from "./assets/images/bg-main-mobile.png";

export default function App() {
    const [data , setData] = useState({
        name: "",
        cardNumber: "",
        expMonth: "",
        expYear: "",
        cvc: "",
        isSubmit: false
    });

    const [errors , setErros] = useState({});

    const handleData = (field, value) => {
        setData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleErrors = (err) => setErros(err);


    return (
        <main className="relative min-h-screen bg-white font-space text-purple-950 lg:grid lg:grid-cols-[33.54vw_1fr]">
            <picture className="absolute inset-x-0 top-0 z-0 block h-60 lg:inset-y-0 lg:right-auto lg:h-screen lg:w-[33.54vw]">
                <source media="(max-width: 767px)" srcSet={mobileBackground} />
                <img className="block h-full w-full object-cover" src={desktopBackground} alt="" />
            </picture>

            <Preview data={data} />
            {data.isSubmit
                ? <div className="absolute left-1/2 top-83 z-20 w-[calc(100%-48px)] max-w-[381px] -translate-x-1/2 lg:left-[57.78vw] lg:top-76.5 lg:w-95.25 lg:translate-x-0">
                    <ThankYou />
                </div>
                : <Form
                    data={data}
                    errors={errors}
                    handleErrors={handleErrors}
                    handleData={handleData}
                />}
        </main>
    )

}