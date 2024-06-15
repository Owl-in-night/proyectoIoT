import { Route, Routes } from "react-router-dom";
//import Home from '../../pages/Home'
import AppWeb from "../../pages/app";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import Record from "../../pages/Record";
function Navegation() {
  return (
    <div className="Navegation">
      <Routes>
        <Route path="/" element={<AppWeb />} />
        <Route path="/app" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/record" element={<Record />} />
      </Routes>
    </div>
  );
}
export default Navegation;
