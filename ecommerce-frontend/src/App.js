import logo from './logo.svg';
import './App.css';
import Routes from "./routes/Routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { DataProvider } from "./DataContext";

export default function App() {
  return (
    <div className="App">
      <DataProvider>
        <Navbar />
        <Routes />
        <Footer />
      </DataProvider>
    </div>
  );
}

