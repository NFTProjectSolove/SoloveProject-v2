
import "./App.css";
import Mint from "./Mint";
import MainHome from "./MainHome";
import About from "./About";
import Roadmap from "./Roadmap";
import Faq from "./Faq";
import Header from "./Header";

import { Route, Routes } from "react-router";

const App = () => {

return (
    <>
        <Header/>
        <Routes>  
            <Route path='/' element={<MainHome/>}></Route>
            <Route path='/About' element={<About/>}></Route>
            <Route path='/Roadmap' element={<Roadmap/>}></Route>
            <Route path='/Faq' element={<Faq/>}></Route>
            <Route path="/Mint" element = {<Mint />}></Route>
        </Routes>
    </>
);
};

export default App;
