import { Route, Routes } from "react-router-dom";
import ItemListContainer from "./item_guide/item_list/Item_List-Container";
import ItemDetailContainer from "./item_guide/item_detail/Item_Detail-Container";
import "../styles.css"

const Main = () => {
    return (
        <>
            <Routes>
               <Route path="/category/:faction" element={<ItemListContainer/>}/>
               <Route path="/item/:id" element={<ItemDetailContainer/>}/>
               <Route path="/cart" element={}/> 
            </Routes>
        </>
    )
}

export default Main