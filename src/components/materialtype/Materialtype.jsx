// Materialtype.js
import React, { Fragment, useState } from 'react';
import { FaLaptop } from 'react-icons/fa';
import s from "./materialtype.module.css";

export default function Materialtype({ onMaterialTypeChange }) {
    const [materialType, setMaterialType] = useState('Ordinateur Portable');

    const handleMaterialChange = (e) => {
        const selectedType = e.target.value;
        setMaterialType(selectedType);
        onMaterialTypeChange(selectedType);
    };

    return (
        <Fragment>
            <div className='flex gap-3 w-96'>
                <fieldset className='p-6 border border-gray-400 rounded-lg shadow-lg mx-auto bg-white'>
                    <legend className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                        <FaLaptop className="mr-2" />
                        Type de matériel
                    </legend>
                    <div className={`${s.formMaterial}`}>
                        {['Ordinateur Portable', 'Téléphone', 'Tablet', 'Ordinateur de Bureau'].map((item, index) => (
                            <label key={index} className="flex items-center space-x-3 mb-2 cursor-pointer transition-colors duration-200 hover:bg-gray-100 rounded-lg p-2">
                                <input
                                    type="radio"
                                    name="material"
                                    value={item}
                                    checked={materialType === item}
                                    onChange={handleMaterialChange}
                                    className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-gray-700">{item}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            </div>
        </Fragment>
    );
}
