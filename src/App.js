import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import AuthProvider from './components/Context'
import "./App.css";



function App() {
  return (
    <Router>
      <AuthProvider>
        <div className='App'>
          <Layout />
        </div>
      </AuthProvider>
    </Router>
	);
}

export default App;
