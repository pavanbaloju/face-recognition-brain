import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Rank from './components/rank/Rank';
import ParticlesBg from 'particles-bg';
import { useState } from 'react';
import SignIn from './components/signin/SignIn';
import Register from './components/register/Register';

const faceDetectionApi = 'http://localhost:3010/detectface'
const updateImageEntriesApi = 'http://localhost:3010/image';

const App = () => {

  const [imageUrl, setImageUrl] = useState('');
  const [input, setInput] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({})

  const onInputChange = (event) => setInput(event.target.value);
  const onButtonSubmit = () => {
    setImageUrl(input);
    detect(input);
  }
  const onRouteChange = (route) => {
    if (route === 'signout') {
      clearState();
    }
    setIsSignedIn(route === 'home');
    setRoute(route);
  }
  const clearState = () => {
    setImageUrl('');
    setInput('');
  }

  const detect = (imageUrl) => {
    if (imageUrl) {
      fetch(faceDetectionApi, getRequestBody(imageUrl))
        .then(response => response.json())
        .then(calculateFaceLocation)
        .then(setBox)
        .then(() => {
          fetch(updateImageEntriesApi, getUpdateEntriesRequest(user.id))
            .then(response => response.json())
            .then(count => setUser({ ...user, entries: count }))
            .catch(console.log)
        })
        .catch(error => console.log('Something went wrong..', error));
    }
  };

  return (
    <div>
      < div className="App" >
        <ParticlesBg type="circle" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      </div >
      {
        route === 'home'
          ?
          <div>
            <Logo />
            <Rank user={user} />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition
              imageUrl={imageUrl}
              box={box}
            />
          </div>
          :
          ((route === 'register')
            ? <Register onRouteChange={onRouteChange} loadUser={setUser} />
            : <SignIn onRouteChange={onRouteChange} loadUser={setUser} />)
      }
    </div>
  );
}

const getRequestBody = (imageUrl) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageUrl: imageUrl
    })
  };
}

const getUpdateEntriesRequest = (id) => {
  return {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id
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


