import React, {useEffect, useState} from 'react';
//import './App.css';
import Axios from 'axios'

function Admin(){

    const [produtcsList, setProductsList] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const [orderItemList, setOrderItemsList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    


    useEffect(() => {
        Axios.get('http://localhost:8080/api/get').then((response) => {
          //console.log(response.data);
          setProductsList(response.data)
        }).then(() =>{
            console.log(' get products')
        })

        Axios.get('http://localhost:8080/api/get/orders').then((response) => {
          //console.log(response.data);
          setOrdersList(response.data)
        }).then(() =>{
            console.log(' get orders')
        })

        Axios.get('http://localhost:8080/api/get/orderitems').then((response) => {
          //console.log(response.data);
          setOrderItemsList(response.data)
        }).then(() =>{
            console.log(' get order items')
        })

        Axios.get('http://localhost:8080/api/get/customer').then((response) => {
            console.log(response.data);
            setCustomerList(response.data)
            setLoading(false);
          }).then(() =>{
            console.log(' get customer')
        })
    
      },[])

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    function updateObjednavky(objednavka_id,stav){
        
        Axios.put("http://localhost:8080/api/update", {
            objednavka_id: objednavka_id,
            stav: stav
        }).then(() =>{
            console.log(' put order')
        })

    }


    function zmenStavObjednavky(objednavka_id,aktualny_stav) {
            console.log("ZMENA STAVU"  + aktualny_stav)

            if(aktualny_stav === "nezaplatene"){
                console.log("ZMENA NA  zaplatene")
                updateObjednavky(objednavka_id,"zaplatene")
            } else {
                console.log("ZMENA NA nezaplatene")
                updateObjednavky(objednavka_id,"nezaplatene")
            }
    }

    return(
        <div>
            <h1>ADMIN PAGE</h1>
            <h1>OBJEDNAVKY: </h1>

            {ordersList.map((order,index) =>{
                let object_customer = customerList.find(x => x.ID === order.customer_id);
                
                
                
                
                return(
                    <div key={index} className="admin">
                        <h3 key={order.ID}>OBJEDNAVKA - ID: {order.ID} STAV: {order.stav}</h3>
                        <p key={object_customer.ID}> {object_customer.meno} - {object_customer.email} - {object_customer.ulica} - {object_customer.cislo} - {object_customer.mesto}</p>
                        <button key={index + 323} onClick={() => zmenStavObjednavky(order.ID,order.stav)}>ZMEN STAV OBJEDNAVKY </button>
                        {orderItemList.map((orderItem,index)=>{

                            if(orderItem.Order_ID === order.ID){
                                let object_product = produtcsList.find(x => x.ID === orderItem.Product_ID);
                                return(
                                    <div key={index}>
                                        <p key={index+99}> ProductID: { orderItem.Product_ID} - QUANTITY: {orderItem.Quantity}</p> 
                                        <p key={index+999}> {object_product.Nazov} | Price per Item: {object_product.Cena} €</p>
                                    </div>
                                    
                                    
                                )
                                
                            }
                            return null

                            
                        })}

                    </div>
                )
            })}
           
        </div>
    )
 

} 


export default Admin;