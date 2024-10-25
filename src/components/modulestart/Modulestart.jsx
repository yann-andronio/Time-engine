import React, { Fragment, useState } from 'react';
import s from "./modulestart.module.css";
import Materialtype from '../materialtype/Materialtype';
import Limitertemps from '../limitertemp/Limitertemps';
import Payement from '../payement/Payement';

export default function Modulestart() {


    const [paymentStatus, setPaymentStatus] = useState('Non payée');

    const [money, setMoney] = useState('');

    return (
        <Fragment>


            <div className={`${s.Bigboxmodulestart}  `}>
                <div className={`${s.Boximport}  flex gap-8  `}>
                    <Materialtype />
                    <Limitertemps />
                    <Payement />
                </div>
                {/* confirmation */}
                <div className={`${s.confirm} flex justify-end mt-4 gap-4`}>

                    <button type="button" className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Annuler
                    </button>

                    <button type="button" className="mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Confirmer
                    </button>

                </div>

            </div>

        </Fragment>
    );
}
