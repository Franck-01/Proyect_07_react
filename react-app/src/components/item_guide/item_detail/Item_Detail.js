import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount";
import { context } from "../../context/Context";
import "../../../styles.css"

const ItemDetail = ({item}) => {
    const [counter, setCounter] = useState()
    const {addShip} = useContext(context)
    
    const handle_On_Add = (counter) => {
        addShip(item, counter)
        setCounter(counter)
    }
    return (
        <div className="ItemDetail">
            <h2>Clase de nave : <i>{item.name}</i></h2>
            <img src={item.url} alt={item.name} className="ItemImg"/>
            <h4>Modelo de nave : <i>{item.model}</i></h4>
            <p>{item.description}</p>
            <Link to="/">
                <button>
                    <b>Volver al inicio</b>
                </button>
            </Link>{counter? <Link to="/cart">
                <button>
                    <b>finalizar compra</b>
                </button>
            </Link>: <ItemCount model={item.name} stock={item.stock} onAdd={handle_On_Add} initial={1}/>}
        </div>
    )
}
export default ItemDetail