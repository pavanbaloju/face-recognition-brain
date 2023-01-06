const FaceRecognition = ({imageUrl}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img alt='test' src={imageUrl} width="500px" height="500px"/>
            </div>
        </div>
    );
}

export default FaceRecognition;