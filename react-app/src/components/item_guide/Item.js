import { Link } from "react-router-dom";
import "../../../styles.css"

const Item = ({ship}) => {
    return (
        <div className="CardItem">
            <div className="ContainerItem">
                <h2 className="ItemHeader">
                    Clase de nave : <i>{ship.name} </i>
                    </h2>
            </div>
            <h3><Link to={`/item/${ship.name}`}>detalles</Link></h3>
            <img src={ship.url} alt={ship.name} className="ItemImg"/>
            <h4>Modelo de nave : <i>{ship.model}</i></h4>
        </div>
    )
}
export default Item;