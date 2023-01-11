import { createContext, useState, memo } from "react";

export const context = createContext()
export const {Provider} = context

const CartContext = ({children}) => {
    const [fleet, setFleet] = useState([])

    const addFleet = (ship, counter) => {
        const products = {
            name: ship.name,
            model: ship.model,
            faction: ship.faction,
            description: ship.description,
            url: ship.url,
            price: ship.price,
            counter: counter
        }
        setFleet([...fleet, products])
    }
    const total_Sum = (array) => {
        let count = 0
        array.forEach(ship => count += ship.cost*ship.counter)
        count.toFixed(2)
        return count
    }
    const countShip = () => {
        let count = 0
        fleet.forEach(prod =>{
            count += prod.counter
        })
        return count
    }
    const addShip = (ship, count) => {
        if (IsInCart(ship.name)) {
            const duplicated = fleet.find((duplicatedShip)=> duplicatedShip.name === ship.name)
            duplicated.count = duplicated.count + count
            const rest = fleet.filter((restShip)=> restShip.name !== ship.name)
            setFleet([...rest, duplicated])
        } else {
            ship.count = count
            setFleet([...fleet, ship])
        }
    }
    const IsInCart = (name) => {
        fleet.some((naves)=> naves.name === name)
    }
    const deleteShip = (id) => {
        const borrar = fleet.filter((remove)=> remove.id !== id)
        setFleet(borrar)
    }
    const clearFleet = () => {
        setFleet([])
    }
    return (
        <Provider value = {{fleet, addShip, IsInCart, deleteShip, clearFleet, countShip, total_Sum, addFleet}}>
            {children}
        </Provider>
    )
}

export default memo(CartContext)