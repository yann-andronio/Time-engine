import React, { Fragment } from 'react';
import CardStart from '../../components/cardStart/CardStart';
import s from "./Home";
import Modulestart from '../../components/modulestart/Modulestart';

export default function Home() {
    return (
        <Fragment>
            <div className={`${s.BigBox} p-7 h-screen`}>
                <div className="navbar text-center">
                    <h1 className='text-blue-800 text-4xl'>cyber</h1>
                </div>
                <main className={`${s.BoxMain} relative  `}>
                    <div className={`${s.BoxParents} lg:grid-cols-3 md:grid-cols-2  mt-10 grid grid-cols-1 gap-4`}>
                        {

                            Array(9).fill(5).map((item, index = 0) => (
                                <Fragment key={index}>
                                    <CardStart numero={index} />
                                </Fragment>
                            ))

                        }
                    </div>

                    <div className={`${s.Boxmodulestart} p-8 bg-orange-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <Modulestart />
                    </div>
                </main>
            </div>
        </Fragment>
    );
}
