// import { createContext, useState } from "react";
// import main from "../config/gemini";


// export const Context = createContext();

// const ContextProvider = (props)  => {

//     const [input, setInput] = useState("");
//     const [recentPrompt, setRecentPrompt] = useState("");
//     const [prevPrompts, setPrevPrompts] = useState([]);
//     const [showResult, setShowResult] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [resultData, setResultData] = useState("");


//     const delayPara = (index, nextWord)=>{
//         setTimeout(function () {
//             setResultData(prev => prev+nextWord)
//         }, 75*index)
//     }

//     const newChat = ()=>{
//         setLoading(false);
//         setShowResult(false)
//     }

//     // const onSent = async (prompt) => {
//     //     setResultData("");
//     //     setLoading(true);
//     //     setShowResult(true);
//     //     setRecentPrompt(input);
//     //     const response = await main(input);
//     //     // remove the ** and * from the result
//     //     let responseArray = response.split("**");
//     //     let newResponse = "";
//     //     for(let i = 0; i < responseArray.length; i++){
//     //         if(i == 0 || i%2 === 1){
//     //             newResponse += responseArray[i]
//     //         }
//     //         else{
//     //             newResponse += "<b style = 'font-weight : 600'>"+responseArray[i]+"</b>"
//     //         }
//     //     }
//     //     let newResponse2 = newResponse.split("*").join("</br>")
//     //     let newResponseArray = newResponse2.split(" ");
//     //     for(let i=0; i<newResponseArray.length; i++){
//     //         const nextWord = newResponseArray[i];
//     //         delayPara(i,nextWord+" ")
//     //     }
//     //     // setResultData(newResponse2);
//     //     // setResultData(response)
//     //     setLoading(false);
//     //     setInput("");
//     // }
//     // onsent("What is react js")

// //     const onSent = async (prompt) => {
// //     setResultData("");
// //     setLoading(true);
// //     setShowResult(true);
// //     let response;
// //     if(prompt !== undefined){
// //         response = await main(prompt);
// //         setRecentPrompt(prompt);
// //     }
// //     else{
// //         setPrevPrompts(prev => [...prev,input]);
// //         setRecentPrompt(input);
// //         response = await main(input)
// //     }
// //     // split by bold markdown
// //     let responseArray = response.split("**");

// //     // FIX 1: initialize string
// //     let newResponse = "";

// //     // FIX 2: correct bold logic
// //     for (let i = 0; i < responseArray.length; i++) {
// //         if (i % 2 === 1) {
// //             newResponse += "<b style='font-weight:600'>" + responseArray[i] + "</b>";
// //         } else {
// //             newResponse += responseArray[i];
// //         }
// //     }

// //     // convert '* heading' → new line + bold
// //     newResponse = newResponse.replace(/^\s*\*\s*(.*)$/gm, "<br><b>$1</b>");

// //     // convert '1. heading' → new line + bold
// //     newResponse = newResponse.replace(/^\s*\d+\.\s*(.*)$/gm, "<br><b>$1</b>");
// //     // convert single * line items to <br>
// //     // let finalResponse = newResponse.replace(/^\s*\*\s*(.*)$/gm, "<br><b>$1</b>");

// //     // typing effect
// //     const words = newResponse.split(" ");
// //     for (let i = 0; i < words.length; i++) {
// //         delayPara(i, words[i] + " ");
// //     }

// //     setLoading(false);
// //     setInput("");
// // };


//     const contextValue = {
//         prevPrompts,
//         setPrevPrompts,
//         onSent,
//         setRecentPrompt,
//         recentPrompt,
//         showResult,
//         loading,
//         resultData,
//         input,
//         setInput,
//         newChat,
//     }

//     return(
//         <Context.Provider value = {contextValue}>
//             {props.children}
//         </Context.Provider>
//     )

// }

// export default ContextProvider;





import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]); 
    const [currentChatId, setCurrentChatId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [imageData, setImageData] = useState(null);

    // image upload function
    const handleImageUpload = (file) => {
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setImageData({
      base64: reader.result.split(",")[1],
      preview: reader.result,
      mimeType: file.type,
    });

    // Show image in chat
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: `<img src="${reader.result}" class="chat-image" />`,
      },
    ]);
  };

  reader.readAsDataURL(file);
};




  // Format Gemini response
  const formatResponse = (response) => {
    let parts = response.split("**");
    let formatted = "";

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) {
        formatted += `<b style="font-weight:600">${parts[i]}</b>`;
      } else {
        formatted += parts[i];
      }
    }

    formatted = formatted.replace(/^\s*\*\s*(.*)$/gm, "<br><b>$1</b>");
    formatted = formatted.replace(/^\s*\d+\.\s*(.*)$/gm, "<br><b>$1</b>");

    return formatted;
  };

  // Start a new chat
  const newChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setInput("");
    setLoading(false);
  };

  // Send message (continue same chat)
  const onSent = async (prompt) => {
  const userMessage = prompt ?? input;

  // allow image-only queries
  if (!userMessage.trim() && !imageData) return;

  setInput("");
  setLoading(true);

  let chatId = currentChatId;

  // Create chat on first message
  if (!chatId) {
    chatId = Date.now();
    setCurrentChatId(chatId);

    setChats((prev) => [
      ...prev,
      {
        id: chatId,
        title: userMessage
          ? userMessage.slice(0, 30)
          : "Image search",
        messages: [],
      },
    ]);
  }

  // Push text message (if exists)
  let userMsg = null;
  if (userMessage.trim()) {
    userMsg = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, userMsg]);
  }

  // 🔥 Gemini call (TEXT + IMAGE)
  const response = await main({
    text: userMessage || "Describe this image",
    image: imageData,
  });

  const formatted = formatResponse(response);

  // Typing effect
  let typed = "";
  const words = formatted.split(" ");

  for (let i = 0; i < words.length; i++) {
    setTimeout(() => {
      typed += words[i] + " ";

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return [...prev.slice(0, -1), { role: "assistant", content: typed }];
        }
        return [...prev, { role: "assistant", content: typed }];
      });
    }, 35 * i);
  }

  setLoading(false);
  setImageData(null); // ✅ clear image after response
};


  return (
    <Context.Provider
      value={{
        input,
        setInput,
        messages,
        chats,
        loading,
        onSent,
        newChat,
        setMessages,
        setCurrentChatId,
        handleImageUpload,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
