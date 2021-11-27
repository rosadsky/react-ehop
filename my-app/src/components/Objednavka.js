import React, {useEffect, useState} from 'react';
//import './App.css';
import Axios from 'axios'
import { Link } from "react-router-dom";

function Objednavka(){
    let data = []
    const [produtcsList, setProductsList] = useState([]);
    const [email, setEmail] = useState("");
    const [meno, setMeno] = useState("");
    const [ulica, setUlica] = useState("");
    const [cislo_domu, setCislo_domu] = useState("");
    const [mesto, setMesto] = useState("");
    const [psc, setPsc] = useState("");


    useEffect(() => {
        Axios.get('http://localhost:8080/api/get').then((response) => {
          //console.log(response.data);
          setProductsList(response.data)
        })
    
      },[])

      const odoslatFormular = () => {
          Axios.post('http://localhost:8080/vlozitobjednavku', {
            email: email,
            meno: meno,
            ulica: ulica,
            cislo_domu: cislo_domu,
            mesto: mesto,
            psc: psc
        }).then(() =>{
            console.log('objednavka bola odoslana na server !!! ')
        })
      }


 
    data =JSON.parse(sessionStorage.getItem('myValueSessionStorage'));
    let data_duplicates = data;
    data = [...new Set(data)];

    return(
        <div>
            <h1>PRODUKTOV V KOŠÍKU {data.length}</h1>
           
           {produtcsList.map((item,index)=>{
               let item_id = item.ID
               if(data.includes(item_id.toString())){
                var count = {};
                data_duplicates.forEach(function(i) { count[i] = (count[i]||0) + 1;});
                return( 

                    <div key={index} className="objedvka-item">
                        <h3 key={item.ID+3}> {item.Nazov}</h3>
                        <img key={item.ID+1} className="img-objednavka" src={item.Image} alt="Logo" />
                        <h4 key={item.ID+5}>pocet kusov {count[item.ID.toString()]}</h4>
                    </div>
                    )
               } else {
                   return null;
               }   
            
           })}
           
           <h1>Udaje objednavajuceho</h1>

           <div className="form">
               <label>Email:</label>
               <input className="form-input" type="text" name="email" onChange = {(e)=>{
                    setEmail(e.target.value)
                    }} />
            
               <label>Meno:</label>
               <input className="form-input" type="text" name="meno"  onChange = {(e)=>{
                    setMeno(e.target.value)
                    }} />

               <label>Ulica:</label>
               <input className="form-input" type="text" name="ulica" onChange = {(e)=>{
                    setUlica(e.target.value)
                    }} />

               <label>Cislo domu:</label>
               <input className="form-input" type="text" name="cislo_domu"  onChange = {(e)=>{
                    setCislo_domu(e.target.value)
                    }} />

               <label>Mesto:</label>
               <input className="form-input" type="text" name="mesto"  onChange = {(e)=>{
                    setMesto(e.target.value);
                    }} />

               <label>PSC:</label>
               <input className="form-input" type="text" name="psc"  onChange = {(e)=>{
                    setPsc(e.target.value);
                    }} />


                <Link to="/podakovanie">
                    <button onClick={odoslatFormular}>Submit</button>
                </Link>
           </div>

           
            
        </div>
    )
 

} 


export default Objednavka;