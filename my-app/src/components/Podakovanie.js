import React, {useEffect, useState} from 'react';
//import './App.css';
import Axios from 'axios'

function Podakovanie(){

    const [reklama, setReklama] = useState({});

    useEffect(() => {

        Axios.get('http://localhost:8080/api/get/reklama').then((response) => {
            //console.log(response.data);
            setReklama(response.data[0])
            console.log(response.data[0])
          }).then(() =>{
              console.log(' get reklama')
          })
        
      },[])
    
      const kliknutieNaReklamu = () => {

        Axios.put("http://localhost:8080/api/kliknutie").then(() =>{
            console.log(' put order')
        })

        console.log("KLIKKKK")
      }

    return(
        <div>
            <h1>DAKUJEME PAGE</h1>
            <h3>{reklama.id}</h3>
            <a href={reklama.link}>
                <img className="imgreklama" key={reklama.id+1}  src={reklama.image}  onClick={kliknutieNaReklamu} alt="Logo" />
            </a>
        </div>
    )
 

} 


export default Podakovanie;