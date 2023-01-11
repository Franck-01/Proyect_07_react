import NavBar from "./NavBar"
import { Link } from "react-router-dom"
import "../styles.css"

const Header = () => {
    const welcome = "Te Presento a tu Futura Flota"

    return(
        <header>
            <div className="imagen">
                <Link to="/">
                    <img src="https://raw.githubusercontent.com/Franck-01/Project-SW/master/public/images/SWTFA.png"/>
                </Link>
                <h2 className="white">Escoje tus naves, inspecciona el arsenal y crea la flota mas poderosa que la galaxia haya visto</h2>
                <h3><i>{welcome}</i></h3>
            </div>
        </header>
    )
}

export default Header