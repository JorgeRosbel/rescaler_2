import { FaCloudDownloadAlt } from "react-icons/fa";
import '../style/descarga.css';

export function Output({id,name,resolution,res,link}){

    return(
        <div className="output">
            <span className="number">{`#${id}`}</span>
            {/* <p className="name">{name}</p> */}
            <p className="out-res">{`${resolution}x${res}`}</p>
            <a className="down-link" href={link} download = {name}><FaCloudDownloadAlt className="donw-ico" />Descargar</a>
        </div>
    )
}


export function DisplayOutput({info,width,height}){
    
    return(
        info.map(v =>{
            return (
              <Output
              key = {v.number}
              id = {v.number}
              name = {v.name}
              resolution={width}
              res = {height}
              link = {v.url}
              />
            )
          })
          
    )
}