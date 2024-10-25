import React, { Fragment } from 'react';
import { FaCirclePlay } from "react-icons/fa6";
import s from "./cardstart.module.css";

export default function CardStart({ numero }) {
    return (
        <Fragment>
            <div className={`${s.cardBox} h-40 p-7 flex justify-center items-center gap-8 bg-[#541ec144]  text-white rounded-lg shadow-lg `}>
                <FaCirclePlay size={70} className="text-white animate-spin-slow" />
                <p className='text-3xl font-semibold tracking-wide'>START</p>
                <p className='text-3xl font-semibold'>#{numero}</p>
            </div>
        </Fragment>
    )
}
