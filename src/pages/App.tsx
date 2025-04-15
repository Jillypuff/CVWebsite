import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Expertise from '../components/Expertise';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
        <Expertise />
      </main>
      <Footer />
    </div>
  );
}

export default App;
