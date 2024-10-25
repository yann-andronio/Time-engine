import React, { Fragment, useState } from 'react';
import s from "./payement.module.css";

export default function Payement() {
    const [payement, setPayement] = useState("non"); // Valeur par défaut à "non"
    const [description, setDescription] = useState(""); // État pour la description

    return (
        <Fragment>
            <form action="" className='w-96'>
                <fieldset className='p-6 border border-gray-400 rounded-lg shadow-md mx-auto'>
                    <legend>Paiements</legend>

                    <div className={`${s.BoxPayements}`}>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="payement"
                                value="non"
                                checked={payement === "non"}
                                onChange={(e) => setPayement(e.target.value)}
                                className="form-radio"
                            />
                            <span> Non payé</span>
                        </label>

                        <label className="flex items-center space-x-2 mt-2">
                            <input
                                type="radio"
                                name="payement"
                                value="oui"
                                checked={payement === "oui"}
                                onChange={(e) => setPayement(e.target.value)}
                                className="form-radio"
                            />
                            <span> Payé</span>
                        </label>
                    </div>

                    {/* Zone de texte pour la description */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            rows="4"
                            placeholder="Entrez une description..."
                        />
                    </div>

                </fieldset>
            </form>
        </Fragment>
    );
}
