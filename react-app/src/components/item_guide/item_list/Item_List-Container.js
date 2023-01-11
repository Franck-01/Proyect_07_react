import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../API/API.json"
import ItemList from "./Item_List";
import "../../../styles.css"


const ItemListContainer = () => {
    const {faction} = useParams()
    console.log(faction)
    
    const [menssage, setMenssage] = useState("...cargando información...")
    const [products, setProducts] = useState([])

    useEffect(() => {
        const promise  = new Promise((res, rej) => {
            setTimeout(() => {
                if (faction) {
                    const filter = API.filter((ship) => ship.faction === faction)
                    res(filter)
                } else {
                    res(API)
                }
            }, 3000)
        })
        promise
            .then((result) => {
                setMenssage("")
                setProducts(result)
            })
            .catch(() => {
                setMenssage("Tenemos un fallo")
            })
            return (
                <div className="ItemListContainer">
                    <p className='mensaje'>{menssage}</p>
                    <ItemList products={products}/>
                </div>
            )
    })
}

export default ItemListContainer