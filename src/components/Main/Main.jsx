


import React, { useContext, useEffect, useRef, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

import CollectionsIcon from "@mui/icons-material/Collections";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";

const Main = () => {
  const { input, setInput, onSent, messages, loading,handleImageUpload } = useContext(Context);

  const chatEndRef = useRef(null);

  const [listening, setListening] = useState(false)

  const startVoiceInput = ()=> {
    if(!("webkitSpeechRecognition" in window)){
      alert("Voice Recognition not supported in this Browser...");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onspeechend = ()=>{
      recognition.stop()
    }

    recognition.onresult = (event)=>{
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      onSent(transcript)
    }

    recognition.onerror = (e)=>{
      console.error("Voice Error:",e);
    }
    recognition.start();
  

  }

  // Auto-scroll to bottom whenever messages or loading changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="main">
      {/* NAV */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {/* Greeting + cards */}
        {messages.length === 0 && (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev...</span>
              </p>
              <p style={{ color: "#c5c5c5" }}>How can I help you today?</p>
            </div>

            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  onSent(
                    "Suggest beautiful places to see on an upcoming road trip"
                  )
                }
              >
                <p>
                  Suggest beautiful places to see on an upcoming road trip
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div
                className="card"
                onClick={() =>
                  onSent("Briefly summarize this concept : urban planning")
                }
              >
                <p>Briefly summarize this concept : urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div
                className="card"
                onClick={() =>
                  onSent(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div
                className="card"
                onClick={() =>
                  onSent("Improve the readability of the working code")
                }
              >
                <p>Improve the readability of the working code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        )}

        {/* Chat container */}
        {messages.length > 0 && (
          <div className="result">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`result-data ${
                  msg.role === "user" ? "user-msg" : "assistant-msg"
                }`}
              >
                {msg.role === "assistant" && (
                  <img src={assets.gemini_icon} className="gemini-icon" alt="" />
                )}

                <p dangerouslySetInnerHTML={{ __html: msg.content }} />

                {msg.role === "user" && <img src={assets.user_icon} className="gemini-icon" alt="" />}
              </div>
            ))}

            {/* Loader */}
            {loading && (
              <div className="result-data assistant-msg">
                <div className="gemini-loader-box">
                  <img
                    src={assets.gemini_icon}
                    className="gemini-icon"
                    alt=""
                  />
                  <span className="gemini-ring"></span>
                </div>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>
        )}

        {/* Input */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSent();
                }
              }}
            />

            <div className="send-icons-section">
                <input type="file" id="image-upload" accept="image/*" style={{display:'none'}} onChange={(e)=>handleImageUpload(e.target.files[0])} />
                <label htmlFor="image-upload" style={{cursor:"pointer"}}>
                    <CollectionsIcon />
                </label>
              <MicIcon onClick = {startVoiceInput} style={{cursor:'pointer', color: listening ? "1a73e8" : "inherit"}}/>
              {input && <SendIcon onClick={() => onSent()} />}
            </div>
          </div>

          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;

















// import React, { useContext } from 'react'
// import { assets } from '../../assets/assets'
// import './Main.css'
// import { Context } from '../../context/Context'
// import CollectionsIcon from '@mui/icons-material/Collections';
// import MicIcon from '@mui/icons-material/Mic';
// import SendIcon from '@mui/icons-material/Send';

// const Main = () => {

//     const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)

//   return (
//     <div className='main'>
//         <div className="nav">
//             <p>Gemini</p>
//             <img src={assets.user_icon} alt="" />
//         </div>
//         <div className="main-container">
//             {!showResult ? 

//                 <>
//                     <div className="greet">
//                         <p><span>Hello, Dev...</span></p>
//                         <p style={{color:"#c5c5c5"}}>How can I help you today?</p>
//                     </div>
//                     <div className="cards">
//                         <div className="card">
//                             <p>Suggest beautiful places to see on an upcoming road trip</p>
//                             <img src={assets.compass_icon} alt="" />
//                         </div>
//                         <div className="card">
//                             <p>Briefly summarize this concept : urban planning</p>
//                             <img src={assets.bulb_icon} alt="" />
//                         </div>
//                         <div className="card">
//                             <p>Brainstrom team bonding activities for our work retreat</p>
//                             <img src={assets.message_icon} alt="" />
//                         </div>
//                         <div className="card">
//                             <p>Improve the readability of the working code </p>
//                             <img src={assets.code_icon} alt="" />
//                         </div>
//                     </div>
//                 </> : 
//                 <div className='result'>
//                     <div className="result-title">
//                         <img src={assets.user_icon} alt="" />
//                         <p>{recentPrompt}</p>
//                     </div>
//                     <div className="result-data">
//                         {/* <img src={assets.gemini_icon} alt="" />
//                         {loading ? <div className='loader'>
//                             <hr />
//                             <hr />
//                             <hr />
                        
//                         </div> 
//                         : <p dangerouslySetInnerHTML={{__html : resultData}}></p>
//                         } */}
//                         <div className="gemini-loader-box">
//                             <img src={assets.gemini_icon} className="gemini-icon" alt="" />

//                             {loading && (
//                                 <span className="gemini-ring"></span>
//                             )}
//                         </div>

//                         {!loading && (
//                             <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
//                         )}
//                     </div>

//                 </div>
            
//             }
          

//              <div className="main-bottom">
//                 <div className="search-box">
//                     <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here...' onKeyDown={(e)=>{if(e.key == "Enter" && !e.shiftKey){e.preventDefault(); onSent()}}} />
//                     <div className='send-icons-section'>
//                         <CollectionsIcon alt="" />
//                         <MicIcon alt="" />
//                         {input ? <SendIcon onClick={()=>onSent()}  alt="" /> : null}
//                     </div>
//                 </div>
//                 <p className='bottom-info'>Gemini may display inaccurate info, including about people, so double check its responses. Your privacy and Gemini Apps.</p>
//              </div>
//         </div>
        
      
//     </div>
//   )
// }

// export default Main





// import React, { useContext } from "react";
// import { assets } from "../../assets/assets";
// import "./Main.css";
// import { Context } from "../../context/Context";

// import CollectionsIcon from "@mui/icons-material/Collections";
// import MicIcon from "@mui/icons-material/Mic";
// import SendIcon from "@mui/icons-material/Send";

// const Main = () => {
//   const { onSent, messages, loading, input, setInput } =
//     useContext(Context);

//   return (
//     <div className="main">
//       {/* NAV */}
//       <div className="nav">
//         <p>Gemini</p>
//         <img src={assets.user_icon} alt="" />
//       </div>

//       <div className="main-container">
//         {/* GREETING + CARDS (ONLY WHEN NO CHAT) */}
//         {messages.length === 0 && (
//           <>
//             <div className="greet">
//               <p>
//                 <span>Hello, Dev...</span>
//               </p>
//               <p style={{ color: "#c5c5c5" }}>
//                 How can I help you today?
//               </p>
//             </div>

//             <div className="cards">
//               <div
//                 className="card"
//                 onClick={() =>
//                   onSent(
//                     "Suggest beautiful places to see on an upcoming road trip"
//                   )
//                 }
//               >
//                 <p>
//                   Suggest beautiful places to see on an upcoming road trip
//                 </p>
//                 <img src={assets.compass_icon} alt="" />
//               </div>

//               <div
//                 className="card"
//                 onClick={() =>
//                   onSent("Briefly summarize this concept : urban planning")
//                 }
//               >
//                 <p>Briefly summarize this concept : urban planning</p>
//                 <img src={assets.bulb_icon} alt="" />
//               </div>

//               <div
//                 className="card"
//                 onClick={() =>
//                   onSent(
//                     "Brainstorm team bonding activities for our work retreat"
//                   )
//                 }
//               >
//                 <p>
//                   Brainstorm team bonding activities for our work retreat
//                 </p>
//                 <img src={assets.message_icon} alt="" />
//               </div>

//               <div
//                 className="card"
//                 onClick={() =>
//                   onSent("Improve the readability of the working code")
//                 }
//               >
//                 <p>Improve the readability of the working code</p>
//                 <img src={assets.code_icon} alt="" />
//               </div>
//             </div>
//           </>
//         )}

//         {/* CHAT RESULTS (REUSING YOUR CSS) */}
//         {messages.length > 0 && (
//           <div className="result">
//             {messages.map((msg, index) => (
//               <div key={index} className="result-data">
//                 <img
//                   src={
//                     msg.role === "user"
//                       ? assets.user_icon
//                       : assets.gemini_icon
//                   }
//                   alt=""
//                 />

//                 <p
//                   dangerouslySetInnerHTML={{ __html: msg.content }}
//                 ></p>
//               </div>
//             ))}

//             {/* LOADER (YOUR EXISTING GEMINI LOADER) */}
//             {loading && (
//               <div className="result-data">
//                 <div className="gemini-loader-box">
//                   <img
//                     src={assets.gemini_icon}
//                     className="gemini-icon"
//                     alt=""
//                   />
//                   <span className="gemini-ring"></span>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* INPUT */}
//         <div className="main-bottom">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Enter a prompt here..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   onSent();
//                 }
//               }}
//             />

//             <div className="send-icons-section">
//               <CollectionsIcon />
//               <MicIcon />
//               {input && <SendIcon onClick={() => onSent()} />}
//             </div>
//           </div>

//           <p className="bottom-info">
//             Gemini may display inaccurate info, including about people,
//             so double check its responses.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;


// import React, { useContext, useEffect, useRef } from "react";
// import "./Main.css";
// import { assets } from "../../assets/assets";
// import { Context } from "../../context/Context";

// import CollectionsIcon from "@mui/icons-material/Collections";
// import MicIcon from "@mui/icons-material/Mic";
// import SendIcon from "@mui/icons-material/Send";

// const Main = () => {
//   const { input, setInput, onSent, messages, loading } =
//     useContext(Context);

//     const chatEndRef = useRef(null);

//     useEffect(()=>{
//         chatEndRef.current?.scrollIntoView({behavior : "smooth"});
//     },messages,loading)
//   return (
//     <div className="main">
//       {/* NAV */}
//       <div className="nav">
//         <p>Gemini</p>
//         <img src={assets.user_icon} alt="" />
//       </div>

//       <div className="main-container">
//         {/* Greeting + cards */}
//         {messages.length === 0 && (
//           <>
//             <div className="greet">
//               <p>
//                 <span>Hello, Dev...</span>
//               </p>
//               <p style={{ color: "#c5c5c5" }}>
//                 How can I help you today?
//               </p>
//             </div>

//             <div className="cards">
//               <div className="card" onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")}>
//                 <p>Suggest beautiful places to see on an upcoming road trip</p>
//                 <img src={assets.compass_icon} alt="" />
//               </div>

//               <div className="card" onClick={() => onSent("Briefly summarize this concept : urban planning")}>
//                 <p>Briefly summarize this concept : urban planning</p>
//                 <img src={assets.bulb_icon} alt="" />
//               </div>

//               <div className="card" onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}>
//                 <p>Brainstorm team bonding activities for our work retreat</p>
//                 <img src={assets.message_icon} alt="" />
//               </div>

//               <div className="card" onClick={() => onSent("Improve the readability of the working code")}>
//                 <p>Improve the readability of the working code</p>
//                 <img src={assets.code_icon} alt="" />
//               </div>
//             </div>
//           </>
//         )}

//         {/* Chat container */}
//         {messages.length > 0 && (
//           <div className="result">
//             {messages.map((msg, index) => (
//               <div key={index} className="result-data">
//                 <img
//                   src={
//                     msg.role === "user"
//                       ? assets.user_icon
//                       : assets.gemini_icon
//                   }
//                   alt=""
//                 />
//                 <p dangerouslySetInnerHTML={{ __html: msg.content }} />
//               </div>
//             ))}

//             {loading && (
//               <div className="result-data">
//                 <div className="gemini-loader-box">
//                   <img
//                     src={assets.gemini_icon}
//                     className="gemini-icon"
//                     alt=""
//                   />
//                   <span className="gemini-ring"></span>
//                 </div>
//               </div>
//             )}
//             <div ref={chatEndRef}></div>
//           </div>
//         )}

//         {/* Input */}
//         <div className="main-bottom">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Enter a prompt here..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   onSent();
//                 }
//               }}
//             />

//             <div className="send-icons-section">
//               <CollectionsIcon />
//               <MicIcon />
//               {input && <SendIcon onClick={() => onSent()} />}
//             </div>
//           </div>

//           <p className="bottom-info">
//             Gemini may display inaccurate info, including about people,
//             so double check its responses.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;


