import Item from "../Item"
import "../../../styles.css"

const ItemList = ({products}) => {
    return (
        <div>
            <ul className="ListGroup">
                {products.map(ship => (
                    <Item productsShip={ship} key={ship} ship={ship}/>
                ))}
            </ul>
        </div>
    )
}

export default ItemList