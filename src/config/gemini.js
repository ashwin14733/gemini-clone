// import { GoogleGenerativeAI } from "@google/generative-ai";

// // const ai = new GoogleGenerativeAI("AIzaSyDtD-KPcIRHrrCKRxwt1e_ONhzZv9-95JU");
// const ai = new GoogleGenerativeAI("AIzaSyAKOAAnD5y4eNIMcsYSWCpNz-PGnJaucnI");


// export const model = ai.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

// async function main(prompt) {
//   const result = await model.generateContent(prompt);
//   console.log(result.response.text());


//   let text = result.response.text();
//   // remove the ** and * from the result
//   // text = text.replace(/^\s*\*\s*(.*)$/gm, "<br><b>$1</b>");

//   // text = text.replace(/\*/g,"");
//   return text
// }

// export default main;


import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const model = ai.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

async function main({ text, image }) {
  const parts = [];

  // ✅ Add image if exists
  if (image) {
    parts.push({
      inlineData: {
        mimeType: image.mimeType,
        data: image.base64,
      },
    });
  }

  // ✅ Add text if exists
  if (text) {
    parts.push({ text });
  }

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
  });

  return result.response.text();
}

export default main;

