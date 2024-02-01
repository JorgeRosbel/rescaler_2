import './App.css';
import {Form} from './componet/form';
import { useState} from 'react';
import {DisplayOutput} from './componet/dow';
import {Loader} from './componet/loader';

function App() {





  const [width,setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [info,setInfo]  = useState([]);
  const [len,setLen] = useState(false)
  const [process,setProcess] = useState('Esperando...');


  const handlerLoader = v => setProcess(v);


  const interval = setInterval(()=>{
    handlerOk(info);
    clearInterval(interval);
  },2000)
  
  const handlerOk = info => setLen(info.length > 0);


  





  const handlerWidth = e =>{
      e.preventDefault();
      setWidth(e.target.value);
  }

  const handlerHeight = e =>{
      e.preventDefault();
      setHeight(e.target.value);
  }

  const handlerInfo = output => setInfo(output)

  // if(info){
  //   console.log(info)
  // }


  return (
    <div className='App'>

      <section className='home'>
        <div className='home-container'>
          <div className='home-text-container'>
            <h1>Reescala tus emotes fácil</h1>
            <p className='home-text'>
            Bienvenido a <strong>Rescaler</strong>, la herramienta para simplificar el proceso de reescalado de emotes.<br/><br/>
            <span className='home-text-o'>¿Te has encontrado alguna vez lidiando con la tarea laboriosa de ajustar el tamaño de tus emotes? Con nuestra aplicación web, ese tiempo de esfuerzo y complicación ha llegado a su fin.</span>
            </p>
            <a href='#app-rescaler'><button className='start-btn'>Comenzar</button></a>
          </div>
          <figure className='home-emotes'>
            <div>
              <img className='emote-h' src={require('./imagen/1.png')} alt='Imagen de emote'/>
              <img className='emote-h' src={require('./imagen/8.png')} alt='Imagen de emote'/>
            </div>
            <div>
              <img className='emote-h' src={require('./imagen/12.png')} alt='Imagen de emote'/>
              <img className='emote-h' src={require('./imagen/11.png')} alt='Imagen de emote'/>
            </div>
          </figure>
        </div>
      </section>

      <section id='app-rescaler' className='app-rescaler'>
        <h2>Comienza a procesar tus emotes!</h2>
        <div className='app-rescaler-container'>
          <Form 
            width={width} 
            height={height}
            handlerHeight={handlerHeight} 
            handlerWidth={handlerWidth}
            handlerInfo={handlerInfo}
            handlerLoader={handlerLoader}
            />
        <div className='output-container'>
          <p className='procesadas-title'>Imágenes procesadas</p>
          {
            len ? <DisplayOutput info={info} width={width} height={height}  /> : <Loader text={process} />
          }
        
         
        </div>

        </div>
      

      </section>

      <section className='display-img'>
        <div className='display'>
          {len ?  (info.map(v => <img key={Math.random() * 9999 | 0} className='preview' src={v.src} alt='nana' />)): null}
        </div>
      </section>
     
    </div>
  );
}

export default App;
