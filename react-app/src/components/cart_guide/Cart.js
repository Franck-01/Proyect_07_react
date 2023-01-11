import { useContext } from "react";
import { Link } from "react-router-dom";
import { context } from "../context/Context";
import "../../styles.css"

const Cart = () => {
    const {fleet, deleteShip, clearFleet} = useContext(context)

    return (
        <>
           <Link to="/">
                <button className="boton">
                    <b>Volver al inicio</b>
                </button>
            </Link>
            <h2>Aqui esta tu flota:</h2> 
            <div className="back">
                <ul>
                {fleet.map((element) =>(
                    <li>
                        <h2>{element.name}</h2>
                        <h3>{element.model}</h3>
                        <img src={element.img_url} alt={element.name} className="ItemImg"/>
                        <button onClick={()=>{deleteShip(element.name)}}>Borrar elemento</button>
                        <button onClick={()=>{clearFleet(fleet)}}>Borrar todo</button>
                    </li>
                ))} 
                </ul>
            </div>
        </>
    )
}
export default Cart ; 