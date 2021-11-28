import React, {useEffect, useState} from 'react';
//import './App.css';
import Axios from 'axios'

function Home(){
    let kosik = []
 const [produtcsList, setProductsList] = useState([])
 //const [,setValue] = React.useState('')

  useEffect(() => {
    Axios.get('http://localhost:8080/api/get').then((response) => {
      setProductsList(response.data)
    })

  },[])
 

  
  const doKosika = event => {
    if (JSON.parse(sessionStorage.getItem('myValueSessionStorage')) == null){
      
      kosik.push(event.target.value);
      console.log("PRAZDNY")
    } else{
      console.log("PRIDAVAM DO KOSIKA ")
      kosik.push(event.target.value)
    } 


    sessionStorage.setItem('myValueSessionStorage',JSON.stringify(kosik));
    console.log(kosik)
    //setValue(event.target.value)
    //setKosikList(kosik.push(event.target.value))
  }


  function onGetClick (){
      let data = sessionStorage.getItem('myValueSessionStorage');
      data = JSON.parse(data);
      console.log(data)
    return data
  }

  const vymazKosik = event => {
    sessionStorage.clear();
    kosik = []
  }
  
  

  return (
    <div className="App">
      <h1>ESHOP BY ROMAN</h1>
      <button onClick={onGetClick}>Stav kosika</button>
      <button onClick={vymazKosik}>Vymaz Kosik</button>

      {produtcsList.map((val,index)=>{
        return(<div key={index} className="card">
          <h1 key= {val.Nazov}>{val.Nazov}</h1>
          <img key={val.Image} className="img-product" src={val.Image} alt="Logo" />
          <button key={val.ID} className="buttonkosik" value={val.ID} onClick={doKosika}>PRIDAT DO KOSIKA</button>
       </div>) 
      }
      )}
    </div> 

  );

}


export default Home;