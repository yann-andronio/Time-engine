import React, { Fragment, useState, useEffect } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import s from "./payement.module.css";

export default function Payement({ onPaymentChange }) {
    const [inputs, setInputs] = useState({
        paymentType: "non",
        description: "",
        amount: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => {
            const updatedValues = { ...values, [name]: value };
            onPaymentChange(updatedValues); 
            return updatedValues;
        });
    };

    useEffect(() => {
        onPaymentChange(inputs); 
    }, []);

    return (
        <Fragment>
            <div className='w-96'>
                <fieldset className='p-6 border border-gray-400 rounded-lg shadow-lg mx-auto bg-white'>
                    <legend className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                        <FiDollarSign className="mr-2 text-xl" />
                        Paiements
                    </legend>

                    <div className={`${s.BoxPayements} mb-4`}>
                        <label className="flex items-center space-x-2 cursor-pointer transition-colors duration-200 hover:bg-gray-100 rounded-lg p-2">
                            <input
                                type="radio"
                                name="paymentType"
                                value="non"
                                checked={inputs.paymentType === "non"}
                                onChange={handleChange}
                                className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">Non payé</span>
                        </label>

                        <label className="flex items-center space-x-2 mt-2 cursor-pointer transition-colors duration-200 hover:bg-gray-100 rounded-lg p-2">
                            <input
                                type="radio"
                                name="paymentType"
                                value="oui"
                                checked={inputs.paymentType === "oui"}
                                onChange={handleChange}
                                className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">Payé</span>
                        </label>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={inputs.description}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                            rows="5"
                            placeholder="Entrez une description..."
                        />
                    </div>

                    

                    {/* Champ de montant (si nécessaire) */}
                    {/* <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Montant</label>
                        <input
                            disabled={inputs.paymentType === "non"}
                            type="number"
                            name="amount"
                            value={inputs.amount}
                            onChange={handleChange}
                            className={`  ${inputs.paymentType === "non" ? 'bg-orange-400' : ''} mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200`}
                            placeholder="Entrez un montant..."
                        />
                    </div> */}
                </fieldset>
            </div>
        </Fragment>
    );
}
