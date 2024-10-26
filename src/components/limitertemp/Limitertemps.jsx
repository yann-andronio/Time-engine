import React, { Fragment, useState, useEffect, useRef } from 'react';
import { FiClock, FiDollarSign } from 'react-icons/fi';
import s from "./limitertemps.module.css";

export default function Limitertemps({ onSubmit }) {
    const [timeLimit, setTimeLimit] = useState(false);
    const [time, setTime] = useState(null);
    const [inputs, setInputs] = useState({});
    const [isMoneySelected, setIsMoneySelected] = useState(false);
    const [isHeureManualSelected, setIsHeureManualSelected] = useState(false);
    const prevValuesRef = useRef({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    useEffect(() => {
        const newValues = { ...inputs, timeLimit, time, isMoneySelected };
        if (JSON.stringify(newValues) !== JSON.stringify(prevValuesRef.current)) {
            onSubmit(newValues);
            prevValuesRef.current = newValues;
        }
    }, [inputs, timeLimit, time, isMoneySelected, onSubmit]);

    useEffect(() => {
        if (!timeLimit) {
            setTime(null);
            setInputs({});
            setIsMoneySelected(false);
            setIsHeureManualSelected(false);
        }
    }, [timeLimit]);

    const handleMoneySelection = (checked) => {
        setIsMoneySelected(checked);
        if (checked) {
            setTime(null);
            setIsHeureManualSelected(false);
            setInputs(prev => ({ ...prev, heure: '0', min: '0' }));
        } else {
            setInputs(prev => ({ ...prev, money: null }));
        }
    };

    const handleTimeSelection = (selectedTime) => {
        setTime(selectedTime);
        setIsHeureManualSelected(false);
        setInputs(prev => ({ ...prev, heure: '0', min: '0' }));
    };

    return (
        <Fragment>
            <div className='flex gap-3'>
                <fieldset className='p-6 border border-gray-400 rounded-lg shadow-md mx-auto bg-white'>
                    <legend className="text-lg font-bold flex items-center">
                        <FiClock className="mr-2 text-xl" />
                        Configuration du temps
                    </legend>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            checked={timeLimit}
                            onChange={(e) => setTimeLimit(e.target.checked)}
                            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-lg">Temps limité</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {[15, 30, 45, 60, 75, 90].map((item, index) => (
                            <label key={index} className={`p-3 border rounded-lg cursor-pointer transition-colors duration-300 ${time === item ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} flex justify-center items-center`}>
                                <input
                                    type="radio"
                                    name="time"
                                    value={item}
                                    onChange={() => handleTimeSelection(item)}
                                    className="hidden"
                                    disabled={!timeLimit || isMoneySelected}
                                />
                                {item} minutes
                            </label>
                        ))}
                    </div>

                    <div className={`${s.heure} mt-4 grid grid-cols-3 gap-4`}>
                        <label className={`p-3 border rounded-lg cursor-pointer transition-colors duration-300 ${isHeureManualSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} flex justify-center items-center`}>
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
                            className={`${s.heure} text-center p-2 border rounded-lg ${(!timeLimit || !isHeureManualSelected || isMoneySelected) ? 'bg-gray-200' : ''}`}
                            disabled={!timeLimit || isMoneySelected || !isHeureManualSelected}
                        />
                        <input
                            type='number'
                            name="min"
                            defaultValue="0"
                            onChange={handleChange}
                            className={`${s.minute} text-center p-2 border rounded-lg ${(!timeLimit || !isHeureManualSelected || isMoneySelected) ? 'bg-gray-200' : ''}`}
                            disabled={!timeLimit || isMoneySelected || !isHeureManualSelected}
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="flex justify-start items-center">
                            <label className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={isMoneySelected}
                                    onChange={(e) => handleMoneySelection(e.target.checked)}
                                    className="cursor-pointer form-checkbox h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    disabled={!timeLimit}
                                />
                                <span className="flex items-center"><FiDollarSign className="mr-1" /> Argent</span>
                            </label>
                        </div>

                        <div className="flex justify-start items-center">
                            <input
                                type="text"
                                name="money"
                                value={inputs.money || ''}
                                disabled={!isMoneySelected || !timeLimit}
                                onChange={handleChange}
                                className={`border p-2 rounded-lg w-[105px] ${(!isMoneySelected || !timeLimit) ? 'bg-gray-200' : 'bg-white'} focus:outline-none focus:border-blue-500`}
                                placeholder="Entrez le montant"
                            />
                        </div>
                    </div>
                </fieldset>
            </div>
        </Fragment>
    );
}
