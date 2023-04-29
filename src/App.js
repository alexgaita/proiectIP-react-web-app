import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAavdnx4f7lVFuTvz3-9jatNv-NhjqzaNI",
  authDomain: "proiect-ip-iot.firebaseapp.com",
  projectId: "proiect-ip-iot",
  storageBucket: "proiect-ip-iot.appspot.com",
  messagingSenderId: "602472862940",
  appId: "1:602472862940:web:3814a99264fcd8c6f1d019"
};

function App() {
  
  const app = initializeApp(firebaseConfig);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
