import "./App.css";
import Mint from "./Mint";
import MainHome from "./MainHome";
import About from "./About";
import Roadmap from "./Roadmap";
import Faq from "./Faq";
import Header from "./Header";
import { Route, Routes, useLocation} from "react-router";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const App = () => {
    const location = useLocation();

return (
    <div style={{backgroundColor:'black', position:'absolute', top:'0' }}>
        <Header/>
        <TransitionGroup className="transitionWrapper"> 
            <CSSTransition
                key={location.pathname}
                classNames="transitionCSS"
                timeout={300}
                >
                <Routes location={location}> 
                    <Route path='/'  element={<MainHome/> }></Route>        
                    <Route path='/About' element={<About/>}></Route>
                    <Route path='/Roadmap' element={<Roadmap/>}></Route>
                    <Route path='/Faq' element={<Faq/>}></Route>
                    <Route path="/Mint" element = {<Mint/>}></Route>
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    </div>
);
};

export default App;
