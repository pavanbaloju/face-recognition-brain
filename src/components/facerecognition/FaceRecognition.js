import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    const displayStyle = imageUrl === '' ? {display: 'none'} : {display: 'block'}
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='350px' height='350px' 
                style={displayStyle}/>
                <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div>
    );
}


export default FaceRecognition;