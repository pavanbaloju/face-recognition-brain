import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3">
                {'This magic brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className="center">
                <div className="pa4 br4 shadow-5 form center">
                    <input
                        className="f4 pa2 w-70 center"
                        type='tex'
                        onChange={onInputChange}
                    />
                    <button
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
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