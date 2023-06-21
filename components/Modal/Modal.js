import { useState, useEffect } from 'react';
import Image from 'next/image';

const Modal = ({ todo_fine=true }) => {
    return (
        <div className="container-modal">
            <div className="content-modal">

                <div className="circle-status">
                    <div className="circle-icon">
                        <div className="icon">
                            <Image
                                src={ 
                                    todo_fine
                                    ? "/icons/good.svg"
                                    : "/icons/no-good.svg"
                                }
                                width={70}
                                height={70}
                            />
                        </div>
                    </div>
                    <div className="circle-pulse-1"/>
                    <div className="circle-pulse-2"/>
                    <div className="circle-pulse-3"/>
                </div>

                <div className={ todo_fine ? "box-content green" : "box-content red"}>

                    <p>{
                        todo_fine
                        ?
                            "Se realizo con exito tu compra, dale al boton de finalizar para acceder a tu ticket de compra."
                        :
                            "Algo salio mal, dale al boton de cerrar para regresar a las formas de pago."
                    }</p>

                </div>

            </div>
        </div>
    )
}

export default Modal;