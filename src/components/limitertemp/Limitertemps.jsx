import React, { Fragment, useState } from 'react';

export default function Limitertemps() {
    const [timeLimit, setTimeLimit] = useState(true);
    const [time, setTime] = useState(null);


    return (
        <Fragment>
            <form className='flex gap-3'>
                <fieldset className='p-6 border border-gray-400 rounded-lg shadow-md mx-auto'>
                    <legend>
                        <div className="">
                            <label className="flex items-center ">
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

                    <fieldset className='p-6 border border-gray-400 rounded-lg shadow-md mx-auto'>
                        <legend>
                            <h1>Temps</h1>
                        </legend>

                        {
                            timeLimit && (
                                <div className="grid grid-cols-3 gap-4">
                                    //affichagen nle boouton jiaby
                                    {
                                        [15, 30, 45, 60, 75, 90].map((item , index) => (
                                            <button
                                                key={index}
                                                className={`p-2 border rounded ${time === item ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                                onClick={(e) => { e.preventDefault(); setTime(item); }}
                                            >
                                                {item} minutes
                                            </button>
                                        ))
                                    }





                                </div>
                            )
                        }

                      
                    </fieldset>

                </fieldset>
            </form>
        </Fragment>
    );
}
