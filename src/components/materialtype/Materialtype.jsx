import React, { Fragment , useState } from 'react'
import s from "./materialtype.module.css"

export default function Materialtype() {

    const [materialType, setMaterialType] = useState('Ordinateur Portable');


    return (
        <Fragment>
            <form className=' flex gap-3  w-96'>
                <fieldset className='p-6  border border-gray-400 rounded-lg shadow-md  mx-auto'>
                    <legend>Type de matériel</legend>
                    <div className={`${s.formMaterial}`}>
                        {

                            ['Ordinateur Portable', 'Téléphone', 'Tablet', 'Ordinateur de Bureau'].map((item, index) => (
                                <label key={index}
                                    className="flex items-center space-x-2" > <input type="radio"
                                        name="material"
                                        value={item}
                                        checked={materialType === item}
                                        onChange={(e) => setMaterialType(e.target.value)}
                                        className="form-radio"
                                    />
                                    <span> {item} </span>
                                </label>))
                        }


                    </div>
                </fieldset>
            </form>

        </Fragment>
    )
}
