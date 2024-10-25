import React, { Fragment, useState, useEffect } from 'react';
import s from "./limitertemps.module.css";

export default function Limitertemps() {
    const [timeLimit, setTimeLimit] = useState(false);
    const [time, setTime] = useState(null);
    const [inputs, setInputs] = useState({});
    const [isMoneySelected, setIsMoneySelected] = useState(false);
    const [isHeureManualSelected, setIsHeureManualSelected] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    // Réinitialiser les styles par défaut lorsque le temps est désactivé
    useEffect(() => {
        if (!timeLimit) {
            setTime(null); // Réinitialiser le temps
            setInputs({}); // Réinitialiser les inputs
            setIsMoneySelected(false); // Réinitialiser la sélection d'argent
            setIsHeureManualSelected(false); // Réinitialiser la sélection d'heure manuelle
        }
    }, [timeLimit]);

    // Gestionnaire de soumission du formulaire
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Valeurs des champs:", inputs);
    };

    // Fonction pour gérer le changement de sélection d'argent
    const handleMoneySelection = (checked) => {
        setIsMoneySelected(checked);
        if (checked) {
            setTime(null); // Réinitialiser le temps
            setInputs(prev => ({ ...prev, heure: '0', min: '0' })); // Réinitialiser heure et min
            setIsHeureManualSelected(false); // Réinitialiser la sélection d'heure manuelle
        }
    };

    return (
        <Fragment>
            <form onSubmit={handleSubmit} className='flex gap-3'>
                <fieldset className='p-6 border border-gray-400 rounded-lg shadow-md mx-auto'>
                    <legend>
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={timeLimit}
                                    onChange={(e) => setTimeLimit(e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span>Temps limiter</span>
                            </label>
                        </div>
                    </legend>

                    <div className="grid grid-cols-3 gap-4">
                        {/* Boutons de sélection du temps */}
                        {[15, 30, 45, 60, 75, 90].map((item, index) => (
                            <label key={index} className={`p-2 border rounded ${time === item ? 'bg-blue-500 text-white' : 'bg-gray-200'} flex justify-center items-center`}>
                                <input
                                    type="radio"
                                    name="time"
                                    value={item}
                                    onChange={() => {
                                        setTime(item);
                                        setIsHeureManualSelected(false);
                                    }}
                                    className="hidden"
                                    disabled={!timeLimit || isMoneySelected}
                                />
                                {item} minutes
                            </label>
                        ))}
                    </div>

                    {/* Réglage manuel de l'heure et des minutes */}
                    <div className={`${s.heure} mt-4 grid grid-cols-3 gap-4`}>
                        <label className={`p-2 border rounded ${isHeureManualSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'} flex justify-center items-center`}>
                            <input
                                type="radio"
                                name="time"
                                value="manual"
                                onChange={() => {
                                    setTime(null);
                                    setIsHeureManualSelected(true);
                                }}
                                className="hidden"
                                disabled={!timeLimit || isMoneySelected}
                            />
                            H/m
                        </label>

                        <input
                            type='number'
                            name="heure"
                            defaultValue="0"
                            onChange={handleChange}
                            className={`${s.heure} text-center p-2 border rounded ${(!timeLimit || !isHeureManualSelected) ? 'bg-gray-200' : ''}`} // Appliquer le style par défaut
                            disabled={!timeLimit || isMoneySelected || !isHeureManualSelected}
                        />
                        <input
                            type='number'
                            name="min"
                            defaultValue="0"
                            onChange={handleChange}
                            className={`${s.minute} text-center p-2 border rounded ${(!timeLimit || !isHeureManualSelected) ? 'bg-gray-200' : ''}`} // Appliquer le style par défaut
                            disabled={!timeLimit || isMoneySelected || !isHeureManualSelected}
                        />
                    </div>

                    {/* Choix entre Temps et Argent */}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="flex justify-start items-center">
                            <label className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={isMoneySelected}
                                    onChange={(e) => handleMoneySelection(e.target.checked)}
                                    className="form-checkbox"
                                    disabled={!timeLimit}
                                />
                                <span>Argents</span>
                            </label>
                        </div>

                        <div className="flex justify-start items-center">
                            <input
                                type="text"
                                name="money"
                                value={inputs.money || ''}
                                disabled={!isMoneySelected || !timeLimit} // Désactiver si la checkbox n'est pas cochée ou si le temps limite n'est pas activé
                                onChange={handleChange} // Permet à l'utilisateur de saisir un montant
                                className={`border p-2 rounded w-[105px] ${(!isMoneySelected || !timeLimit) ? 'bg-gray-200' : ''}`} // Appliquer le style par défaut
                                placeholder="Entrez le montant"
                            />
                        </div>
                    </div>
                </fieldset>
                {/* <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Soumettre</button> */}
            </form>
        </Fragment>
    );
}
