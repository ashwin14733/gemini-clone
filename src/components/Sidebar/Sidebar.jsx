// import React, { useContext, useState } from 'react'
// import './Sidebar.css'
// import { assets } from '../../assets/assets'
// import { Context } from '../../context/Context';
// import MenuIcon from '@mui/icons-material/Menu';
// import AddIcon from '@mui/icons-material/Add';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import HistoryIcon from '@mui/icons-material/History';
// import SettingsIcon from '@mui/icons-material/Settings';

// const Sidebar = () => {

//   const [extended, setExtended] = useState(false);
//   const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context);

//   const loadPrompt = async (prompt) => {
//     setRecentPrompt(prompt);
//     await onSent(prompt)
//   }

//   return (
//     <div className='sidebar'>

//         <div className="top">
//           <MenuIcon onClick={()=>setExtended(prev => !prev)} className='menu'  alt="menu_icon" style={{ color:"white"}} />
//           <div onClick={()=>newChat()} className="new-chat">
//             <AddIcon alt="Plus_icon" />
//             {extended?<p style={{paddingRight:"10px"}}>New Chat</p>:null}
//           </div>

//           {extended ? 
//             <div className="recent">
//             <p className="recent-title">Recent</p>
//             {prevPrompts.map((item,index)=>{
//               return(
//                 <div onClick={()=>loadPrompt(item)} className="recent-entry">
//                   <ChatBubbleOutlineIcon alt="message_icon" />
//                   <p>{item.slice(0,18)}...</p>
//                 </div>
//               )
//             })}
            
//           </div> : null
//         }
//         </div>

//         <div className="bottom">
//           <div className="bottom-item recent-entry">
//             <HelpOutlineIcon alt="question-icon" />
//             { extended ? <p style={{backgroundColor:'transparent'}}>Help</p> : null }
//           </div>
//           <div className="bottom-item recent-entry">
//             <HistoryIcon alt="History-icon" />
//             { extended ? <p style={{backgroundColor:'transparent'}}>Activity</p> : null }  
//           </div>
//           <div className="bottom-item recent-entry">
//             <SettingsIcon alt="settings-icon" />
//           {extended ? <p >Settings</p> : null }  
//           </div>
//         </div>
      
//     </div>
//   )
// }

// export default Sidebar



// import React, { useContext, useState } from "react";
// import "./Sidebar.css";
// import { assets } from "../../assets/assets";
// import { Context } from "../../context/Context";

// import MenuIcon from "@mui/icons-material/Menu";
// import AddIcon from "@mui/icons-material/Add";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import HistoryIcon from "@mui/icons-material/History";
// import SettingsIcon from "@mui/icons-material/Settings";

// const Sidebar = () => {
//   const [extended, setExtended] = useState(false);
//   const { onSent, messages, newChat } = useContext(Context);

//   // Extract only user prompts
//   const recentPrompts = messages
//     .filter((msg) => msg.role === "user")
//     .map((msg) => msg.content);

//   return (
//     <div className="sidebar">
//       <div className="top">
//         <MenuIcon
//           onClick={() => setExtended((prev) => !prev)}
//           className="menu"
//           style={{ color: "white" }}
//         />

//         <div onClick={newChat} className="new-chat">
//           <AddIcon />
//           {extended && <p style={{ paddingRight: "10px" }}>New Chat</p>}
//         </div>

//         {extended && (
//           <div className="recent">
//             <p className="recent-title">Recent</p>

//             {recentPrompts.length === 0 && (
//               <p style={{ color: "#777", fontSize: "14px" }}>
//                 No chats yet
//               </p>
//             )}

//             {recentPrompts.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => onSent(item)}
//                 className="recent-entry"
//               >
//                 <ChatBubbleOutlineIcon />
//                 <p>{item.slice(0, 18)}...</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="bottom">
//         <div className="bottom-item recent-entry">
//           <HelpOutlineIcon />
//           {extended && <p>Help</p>}
//         </div>

//         <div className="bottom-item recent-entry">
//           <HistoryIcon />
//           {extended && <p>Activity</p>}
//         </div>

//         <div className="bottom-item recent-entry">
//           <SettingsIcon />
//           {extended && <p>Settings</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { Context } from "../../context/Context";

import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { chats, setMessages, setCurrentChatId, newChat } =
    useContext(Context);

  return (
    <div className="sidebar">
      <div className="top">
        <MenuIcon
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          style={{ color: "white" }}
        />

        <div className="new-chat" onClick={newChat}>
          <AddIcon />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>

            {chats.map((chat) => (
              <div
                key={chat.id}
                className="recent-entry"
                onClick={() => {
                  setCurrentChatId(chat.id);
                  setMessages(chat.messages);
                }}
              >
                <ChatBubbleOutlineIcon />
                <p>{chat.title.slice(0,18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <HelpOutlineIcon />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <HistoryIcon />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <SettingsIcon />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

