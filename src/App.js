import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dash from './Dash';
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Bookdetails from "./Bookdetails";
import Addform from "./Addform";
import Heroroot from './Hero/Heroroot';

function App() {
  return (
    <BrowserRouter>
    {/* //routes */}
      <Routes>
        <Route path="/" element={<Heroroot />} />
        <Route path="/add" element={<Addform />} />
        <Route path="/details/:isbn13" element={<Bookdetails />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/details/added/:isbn13" element={<Bookdetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
