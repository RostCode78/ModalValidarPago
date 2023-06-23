import { useState, useEffect } from 'react';
import Image from 'next/image';

const Modal = ({ todo_fine=true, abrir_modal, setAbrirModal }) => {

    useEffect( () => {

        // QuerySelectors
        const Container = document.querySelector('.container-modal');
        const Content = document.querySelector('.content-modal');
        const BoxContent = document.querySelector('.box-content');
        const BoxContentParrafo = document.querySelector('.box-content p');
        const BoxContentButtom = document.querySelector('.box-content button');
        const BackgroundBottom = document.querySelector('.background-bottom');

        // Condicional
        if ( abrir_modal ) {

            Container.style.top = "0px";
            Container.style.background = "rgba(74, 74, 74, 0.2)";
            Container.style.boxShadow = "1px 3px 4px rgba(0, 0, 0, 0.15)";
            Container.style.backdropFilter = "blur(4px)";
            setTimeout( () => {
                Content.style.top = "inherit";
                Content.style.transform = "scale(1)";
            }, 400);
            setTimeout( () => {
                if ( todo_fine ) {
                    BoxContent.style.height = "250px";
                } else {
                    BoxContent.style.height = "340px";
                }
            }, 1000);
            setTimeout( () => {
                BackgroundBottom.style.height = "94px";
                BoxContentParrafo.style.opacity = "1";
                BoxContentButtom.style.opacity = "1";
            }, 1200);
            setTimeout( () => {
                BackgroundBottom.style.bottom = "-24px";
            }, 1400);

        } else {

            BackgroundBottom.style.height = "0";
            BoxContentParrafo.style.opacity = "0";
            BoxContentButtom.style.opacity = "0";

            setTimeout( () => {
                BackgroundBottom.style.bottom = "-0";
            }, 400);

            setTimeout( () => {
                BoxContent.style.height = "0";
            }, 600);

            setTimeout( () => {
                Content.style.top = "-100%";
                Content.style.transform = "scale(0)";
            }, 1000);

            setTimeout( () => {
                Container.style.top = "-100%";
                Container.style.background = "rgba(74, 74, 74, 0.0)";
                Container.style.boxShadow = "1px 3px 4px rgba(0, 0, 0, 0.0)";
                Container.style.backdropFilter = "blur(0px)";
            }, 1200);

        }

    }, [abrir_modal]);

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

                    <button onClick={ () => setAbrirModal(false) }>
                        <p>{
                            todo_fine
                            ?
                                "Finalizar"
                            :
                                "Cerrar"
                        }</p>
                    </button>

                </div>

                <div className={ todo_fine ? "background-bottom green" : "background-bottom red" }/>

            </div>
        </div>
    )
}

export default Modal;