import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import appContext from '../../../context/appContex';
import carritoContext from '../../../context/CarritoContext/carritoContext';
import lateralContext from '../../../context/Lateral/lateralContext';

const ModalTarjeta = () => {

    const router = useRouter();

    const ContextApp = useContext(appContext);
    const {
        abrirmodaltarjeta,
        statustarjeta,
        statusdetailtarjeta,
        AbrirModalTarjeta,
        idpedido
    } = ContextApp;

    const ContextCarrito = useContext(carritoContext);
    const {
        TomarEstadoDerecha,
        TomarEstadoIzquierda,
        TomarNombreDeFormaDePago
    } = ContextCarrito;

    const ContextLateral = useContext(lateralContext);
    const {
        ObtenerCarritoGeneral
    } = ContextLateral;

    /*=======================================
    =    REVISAR SI EL PAGO FUE CORRECTO    =
    =======================================*/

    const [ todo_fine, setTodoFine ] = useState(false);
    const [ mensaje_status, setMensajeStatus ] = useState("");

    const paymentStatus = {
        0: "Esperando para ser Pagada",
        1: "Se requiere verificación, por favor revise la sección de Verificar",
        2: "Pagada Parcialmente",
        3: "Pagada",
        4: "En Disputa",
        5: "Sobrepagada",
        6: "Fraude",
        7: "Reverso",
        8: "Contracargo",
        9: "Rechazada por el procesador",
        10: "Error en el sistema",
        11: "Fraude detectado por Shieldgate by Afirme",
        12: "Blacklist de Shieldgate by Afirme",
        13: "Tiempo de tolerancia",
        14: "Expirada por Shieldgate by Afirme",
        15: "Expirado por el carrier",
        16: "Rechazado por Shieldgate by Afirme",
        17: "Abandonada por Shieldgate by Afirme",
        18: "Abandonada por el cliente",
        19: "Código de autorización invalido",
        20: "Código de autorización expirado",
        21: "Fraude Shieldgate by Afirme - Reverso pendiente",
        22: "AuthCode Inválido - Reverso pendiente",
        23: "AuthCode Expirado - Reverso pendiente",
        24: "Fraude Shieldgate by Afirme - Reverso solicitado",
        25: "AuthCode Inválido - Reverso solicitado",
        26: "AuthCode Expirado - Reverso solicitado",
        27: "Comercio - Reverso pendiente",
        28: "Comercio - Reverso solicitado",
        29: "Anulada",
        30: "Transacción asentada (solo para Ecuador)",
        31: "Esperando OTP",
        32: "OTP validado correctamente",
        33: "OTP no validado",
        34: "Reverso parcial",
        35: "Método 3DS solicitado, esperando para continuar",
        36: "Desafío 3DS solicitado, esperando el CRES",
        37: "Rechazada por 3DS"
    };

    useEffect( () => {

        if ( statustarjeta == 'success' ) {
            setTodoFine(true);
            setMensajeStatus(paymentStatus[statusdetailtarjeta]);
        } else {
            setTodoFine(false);
            setMensajeStatus(paymentStatus[statusdetailtarjeta]);
        }

    }, [statustarjeta, statusdetailtarjeta]);

    const GoToFinish = e => {
        e.preventDefault();
        AbrirModalTarjeta(false);

        if ( todo_fine ) {
            setTimeout( () => {
                localStorage.removeItem('cartId');
                localStorage.removeItem('PickUpSeleccionado');
                localStorage.removeItem('cupon');
                localStorage.removeItem('FormaDePago');
                localStorage.removeItem('FormaDeEnvio');
                localStorage.removeItem('CompraPickUp');
                localStorage.removeItem('DatosDeEnvio');
                localStorage.removeItem('__paypal_storage__');
                TomarNombreDeFormaDePago("");
                ObtenerCarritoGeneral([]);
                TomarEstadoDerecha(1);
                TomarEstadoIzquierda(1);
            }, 1000);
            setTimeout( () => {
                router.push(`/ticket?id=${idpedido}`);
            }, 1200);
        }

    }

    /*=================
    =    ANIMACION    =
    =================*/

    useEffect( () => {

        const Container = document.querySelector('.container-modal-tarjeta');
        const Content = document.querySelector('.content-modal-tarjeta');
        const BoxContent = document.querySelector('.box-content');
        const BoxContentParrafo = document.querySelector('.box-content p');
        const BoxContentStatus = document.querySelector('.content-status');
        const BoxContentButtom = document.querySelector('.box-content button');
        const BackgroundBottom = document.querySelector('.background-bottom');

        if ( abrirmodaltarjeta ) {

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
                BoxContentStatus.style.opacity = "1";
                BoxContentButtom.style.opacity = "1";
            }, 1200);
            setTimeout( () => {
                BackgroundBottom.style.bottom = "-24px";
            }, 1400);

        } else {

            BackgroundBottom.style.height = "0";
            BoxContentParrafo.style.opacity = "0";
            BoxContentStatus.style.opacity = "0";
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

    }, [abrirmodaltarjeta]);

    return (
        <div className="container-modal-tarjeta">
            <div className="content-modal-tarjeta">

                <div className="circle-status">
                    <div className="circle-icon">
                        <div className="icon">
                            <Image
                                src={ todo_fine ? "/icons/badge-check-green-500.svg" : "/icons/badge-x-red-400.svg" }
                                width={70}
                                height={70}
                            />
                        </div>
                    </div>
                    <div className="circle-pulse-first"></div>
                    <div className="circle-pulse-second"></div>
                    <div className="circle-pulse-third"></div>
                </div>

                <div className={ todo_fine ? "box-content green" : "box-content red"  }>

                    <p>{
                        todo_fine
                        ?
                            "Se realizo con exito tu compra, dale al boton de finalizar para acceder a tu ticket de compra."
                        :
                            "Algo salio mal, dale al boton de cerrar para regresar a las formas de pago."
                    }</p>

                    <div className={ todo_fine ? "content-status green" : "content-status red" }>
                        { todo_fine
                        ?
                            <p>{ mensaje_status }</p>
                        :
                            <div className="opciones-status">
                                <p>Intenta usar la tarjeta digital de tu app bancaria.</p>
                                <p>Verifica que todos tus datos sean correctos.</p>
                                {/* <button> <p>Ver preguntas y respuestas</p> </button> */}
                            </div>
                        }
                    </div>

                    <button onClick={ e => GoToFinish(e) }>
                        <p>{
                            todo_fine
                            ?
                                "Finalizar"
                            :
                                "Cerrar"
                        }</p>
                    </button>
                    
                </div>

                <div className={ todo_fine ? "background-bottom green" : "background-bottom red" }></div>

            </div>
        </div>
    )
}

export default ModalTarjeta;