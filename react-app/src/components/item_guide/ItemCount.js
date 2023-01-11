import { useState } from "react";

const ItemCount = ({onAdd, initial, stock, model}) => {
    const [counter, setCounter] = useState(1)

    const add = () => {
        if (counter < stock) {
            setCounter(counter + 1)
        }
        console.log("nave añadida")
    }
    const remove = () => {
        if (counter > initial) {
            setCounter(counter - 1);
        }
        console.log("chatarra para Jawas")
    }
    return (
        <section>
            <div className="ItemCount">
                <p>Cantidad de naves disponibles clase <i>{model}</i> : {stock}</p>
                <div>
                    <p>Tus naves: {counter}</p>
                    <button onClick={add}><b>aumentar</b></button>
                    <button onClick={remove}><b>disminuir</b></button>
                    <button onClick={() => onAdd(counter)} type='button'>
                        <b>Agrega a tu flota</b>
                    </button>
                </div>
            </div>
        </section>
    )
}
export default ItemCount