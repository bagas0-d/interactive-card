import { useState } from "react";
import Form from "./Component/Form/CardDetailsForm";
import Preview from "./Component/Preview/CardPreview";
import ThankYou from "./Component/ThankYou-State/ThankYou";

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
        <main>
           <picture>
                <source media="(max-width: 767px)" srcSet="bg-main-mobile.png" />
                <img src="bg-main-mobile.png" alt="Gambar" />
            </picture>

            <Preview data={data}/>
            {data.isSubmit
                ? <ThankYou />
                : <Form 
                data={data}
                errors={errors}
                handleErrors={handleErrors}
                handleData={handleData}/>
                }
        </main>
    )

}