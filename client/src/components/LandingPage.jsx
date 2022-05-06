import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import  Footer from './Footer.jsx';
import "./LandingPage.css"



 export default function LandingPage() {
  return (
  
     <div className="App" style={{ width: '100%', height: '100%',position: 'absolute'}}>
    <ReactPlayer
    url="https://youtu.be/CC29KyPrnUo"
    width="100%"
    height="100%"
    controls
    
    muted
    onEnded={()=>alert('Termino el video')}/> 
        
      <div >
        </div>
        <img
        src={"https://i.pinimg.com/originals/83/ff/83/83ff8313465eacbb0de27839d6e86884.jpg"}
        width="100%" height="300px"
        alt="Not found"
        />
        <Link to="/home">
          <button className="butto"> INGRESA A VIDEOGAMES</button>
        </Link>
        <div>
          <Footer/>
        </div>
     
     </div>
 
  )

}
  
