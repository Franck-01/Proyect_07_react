import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../API/API.json"
import ItemDetail from "./Item_Detail";
import "../../../styles.css"

const ItemDetailContainer = () => {
    const {id} = useParams()
    const [message, setMessage] = useState("Solicitando informacion")
    const [item, setItem] = useState([])

    useEffect(() => {
        const promise  = new Promise((res, rej) => {
            setTimeout(() => {
                const filter = API.filter((ship) => ship.name === id)
                res(filter)
            }, 3000)
        })
        promise
            .then((result) => {
                setMessage("Todo resulto bien")
                setItem(result)
            })
            .catch(() => {
                setMessage("Cargando los archivos")
            })
    }, [id])

    if(item.length === 0) {
        return (
            <div>
                <h1>{message}</h1>
            </div>
        )
    } else {
        return (
            <div>
                <ItemDetail item={item[0]}/>
            </div>
        )
    }
}

export default ItemDetailContainer