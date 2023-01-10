import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f5 center">
                {'This smart brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className="center">
                <div className="pa3 br4 shadow-5 form center">
                    <input
                        className="f5 pa2 w-70 center"
                        type='tex'
                        placeholder='Give your image url'
                        onChange={onInputChange}
                    />
                    <button
                        className="w-30 grow f5 link ph3 pv2 dib white bg-light-purple"
                        onClick={onButtonSubmit}
                    >
                        Detect face!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;