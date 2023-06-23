import { useState } from 'react';
import Modal from "../components/Modal/Modal";

const index = () => {

    const [ todo_fine, setTodoFine ] = useState(true);
    const [ abrir_modal, setAbrirModal ] = useState(false);

    return (
        <div className="container">
            <Modal
                todo_fine={todo_fine}
                abrir_modal={abrir_modal}
                setAbrirModal={setAbrirModal}
            />
            <button onClick={() => setAbrirModal(true) }>
                <p>Boton feito que abre un modal bonito</p>
            </button>
        </div>
    )
}

export default index;