import { NavLink, Link } from "react-router-dom"
import CartWidget from "./cart_guide/CartWidget"

const NavBar = () => {

    const republic = "Republica Galactica"
    const csi = "Alianza Separatista"
    const empire = "Imperio Galactico"
    const rebels = "Alianza Rebelde"
    const id = ""

    return (
        <nav>
            <div className="aspecto">
            <CartWidget />
            <Link to="/">
                <h2 className="marcador">Inicio</h2>
            </Link>
                <h2 className="Rep"><NavLink to={`/categorias/${republic}`}><button variant="primary">{republic}</button></NavLink></h2>
                <h2 className="CSI"><NavLink to={`/categorias/${csi}`}><button variant="primary">{csi}</button></NavLink></h2>
                <h2 className="Imp"><NavLink to={`/categorias/${empire}`}><button variant="primary">{empire}</button></NavLink></h2>
                <h2 className="Reb"><NavLink to={`/categorias/${rebels}`}><button variant="primary">{rebels}</button></NavLink></h2>
            <NavLink to={`/item/${id}`}>
                <h2 className="marcador">Listado</h2>
            </NavLink>
            </div>  
        </nav>
    );
}
export default NavBar