import './App.css';
import Home  from './Components/Home';

export const apiEndpoint = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"; 

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <h1>GeekTrust Admin UI</h1>
      </header>
      <Home />
      <footer className='App-footer'>
        <a href="https://www.geektrust.com/challenge/admin-ui" target="_blank" rel="noreferrer">www.geektrust.com-admin UI</a>
      </footer>
    </div>
  );
}

export default App;
