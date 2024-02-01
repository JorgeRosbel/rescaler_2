import '../style/loader.css';

export function Loader({text}){
    return(
        <div className='loader'><span className='load-text'>{text}</span></div>
    )
}