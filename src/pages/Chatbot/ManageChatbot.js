import "./Chatbot.scss"
import ChatbotDatatable from "../../components/datatables/chatbotDatatable";

const  ChatbotList = () => {
    return (
        <div>
          <div className="list">  
          <div className="listContainer">
          <ChatbotDatatable/>
        </div>
      </div>
      </div>
    );
  };
  
  export default ChatbotList;