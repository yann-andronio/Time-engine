import React, { Fragment, useState } from 'react';
import s from "./modulestart.module.css";
import Materialtype from '../materialtype/Materialtype';
import Limitertemps from '../limitertemp/Limitertemps';

export default function Modulestart() {
  
    
    const [paymentStatus, setPaymentStatus] = useState('Non payée');
    const [time, setTime] = useState('');
    const [money, setMoney] = useState('');

    return (
        <Fragment>
          

            <div className={`${s.Bigboxmodulestart} flex gap-8 ` }>
                <Materialtype />
                <Limitertemps />
           </div>

        </Fragment>
    );
}
