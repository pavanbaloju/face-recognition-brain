import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Rank from './components/rank/Rank';
import ParticlesBg from 'particles-bg';
import { useEffect, useState } from 'react';
import SignIn from './components/signin/SignIn';

const faceDetectionApi = 'https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs';

const App = () => {

  const [imageUrl, setImageUrl] = useState('');
  const [input, setInput] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin')
  const onInputChange = (event) => setInput(event.target.value);
  const onButtonSubmit = () => setImageUrl(input);
  const onRouteChange = (route) => setRoute(route);

  useEffect(() => {
    if (imageUrl) {
      fetch(faceDetectionApi, getRequestBody(imageUrl))
        .then(response => response.json())
        .then(calculateFaceLocation)
        .then(setBox)
        .catch(error => console.log('Something went wrong..', error));
    }
  }, [imageUrl]);

  return (
    <div className="App">
      <ParticlesBg type="circle" bg={true} />
      <Navigation onRouteChange={onRouteChange}/>
      {route === 'signin'
        ? <SignIn onRouteChange={onRouteChange}/>
        : <div> <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition
            imageUrl={imageUrl}
            box={box}
          /></div>
      }
    </div>
  );
}

const getRequestBody = (imageUrl) => {
  return {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key e7299f110b3540829ee80279e7526851'
    },
    body: JSON.stringify({
      "user_app_id": {
        "user_id": 'pavanbaloju',
        "app_id": 'my-first-application'
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": imageUrl
            }
          }
        }
      ]
    })
  };
}

const calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);

  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

export default App;