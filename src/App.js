import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Rank from './components/rank/Rank';
import ParticlesBg from 'particles-bg'
import { useState } from 'react';

function App() {

  const [imageUrl, setImageUrl] = useState('https://samples.clarifai.com/face-det.jpg');
  const [input, setInput] = useState('');
  const onInputChange = (event) => setInput(event.target.value);
  const onButtonSubmit = () => {
    setImageUrl(input);
    predict(imageUrl);
  }

  return (
    <div className="App">
      <ParticlesBg type="circle" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl}/>
    </div>
  );
}

function predict(imageUrl) {
  const USER_ID = 'pavanbaloju';
    const PAT = 'e7299f110b3540829ee80279e7526851';
    const APP_ID = 'my-first-application';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';  
    const IMG_URL = 'https://samples.clarifai.com/face-det.jpg' 

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMG_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
        .catch(error => console.log('error', error));
}

export default App;
