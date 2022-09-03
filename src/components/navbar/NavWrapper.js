
import Navbar from "./Navbar";
import {useState} from 'react'

const NavWrapper = ({children}) => {

  const styles = {
    position: "absolute",
    width: "85%",
    left: "15%",
    transition: '850ms'
  }

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(prevState => !prevState);

  return (
    <>
        <Navbar sidebar={sidebar} showSidebar={showSidebar}/>
        <div className="list" style={sidebar ? styles : null}>  
            {children}
        </div>
    </>
  );
};

export default NavWrapper;