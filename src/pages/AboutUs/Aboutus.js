import "./Aboutus.scss"
import AboutusDatatable from "../../components/datatables/aboutusDatatable";

const  Aboutus = () => {
    return (
        <div>
          <div className="list">  
          <div className="listContainer">
          <AboutusDatatable/>
        </div>
      </div>
      </div>
    );
  };
  
  export default Aboutus;