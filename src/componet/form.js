/* eslint-disable no-restricted-globals */
import React from 'react';
import '../style/form.css';
import { GiProcessor } from "react-icons/gi";
import { AiOutlineColumnWidth,AiOutlineColumnHeight } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { useState } from 'react';
import { FaCheckDouble } from "react-icons/fa";

export function Form({width,height,handlerHeight,handlerWidth,handlerInfo,handlerLoader}){

    let output = [];
    const [files,setFiles] = useState(0)

    const handlerFilesAmount = e => setFiles(e.target.files.length);
 
    const resizeImages = (event,width,height) =>{
        event.preventDefault()
        event.preventDefault();
        const input = document.getElementById('imagenes');
        let id = 1;

        handlerLoader('Procesando...');
    
        Array.from(input.files).forEach(file => {
            const img = new Image();
            const reader = new FileReader();
            const canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            canvas.style.display = 'none';
            const ctx = canvas.getContext('2d');
           
           
            reader.onload = function(e) {
                img.src = e.target.result;
      
                img.onload = function() {
                  // Define el nuevo ancho y alto deseado
                  const nuevoAncho = width ;
                  const nuevoAlto = height;
      
                  // Configura el canvas con las nuevas dimensiones
                  canvas.width = nuevoAncho;
                  canvas.height = nuevoAlto;
      
                  // Dibuja la imagen en el canvas con las nuevas dimensiones
                  ctx.imageSmoothingEnabled = true;
                  ctx.imageSmoothingQuality = 'height';
                  //ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, nuevoAncho, nuevoAlto);
                  ctx.drawImage(img, 0, 0, nuevoAncho, nuevoAlto);

                  const link = document.createElement('a');
                  link.href = canvas.toDataURL('image/png');
                  link.download = `Imagen_${id}.png`;
                  //document.body.appendChild(link);


                  //output = [...output, {"number":id,"name": `Imagen_${id}.png`, "url":canvas.toDataURL('image/png')}]
                  output.push({"number":id,"name": `Imagen_${id}.png`, "url":canvas.toDataURL('image/png'), "src": e.target.result})

                  id++;

                };
            };

            
            reader.readAsDataURL(file);
            handlerInfo(output)
    
        });

      
    };

    return(
        <form className = 'form-app' onSubmit={()=>resizeImages(event,width,height)}>

            <span className='form-title'><GiProcessor className='form-title-ico' />Rescaler App</span>


            <div className='input-box'>
                <span className='input-title'>
                <AiOutlineColumnWidth className='input-ico' />
                    Ingrese el ancho</span>
                <input className='input-number' onChange={handlerWidth} value={width} min="1" max="5000" title='Debes ingresar un valor entre 1 y 5000' pattern="\d+" type='number'  maxLength='4' placeholder='Width(px)' required/>
            </div>
            
            <div className='input-box'>
                <span className='input-title'>
                <AiOutlineColumnHeight className='input-ico' />Ingrese el alto</span>
                <input className='input-number' onChange={handlerHeight} value={height} min="1" max="5000" title='Debes ingresar un valor entre 1 y 5000' pattern="\d+" type='number'  maxLength='4' placeholder='Height(px)' required/>
            </div>


            <div className='input-img-box'>
                <label className='input-imagen' for="imagenes">Seleccionar imágenes PNG</label>
                <input className='input-imagen hidden' type="file" id="imagenes" name="imagenes[]" accept="image/*" onChange={handlerFilesAmount} multiple/>
                <p className='num-file'>{`${files} archivos`}</p>
            </div>
            <span className={files > 0 ? 'msg visible' : 'msg'}><FaCheckDouble className='mark' />Imágenes cargadas</span>
           

            <button className='submit-btn'><GrTransaction className='submit-btn-ico' />Procesar</button>

           
        </form>
    )
}