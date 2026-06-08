import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// API Key حاصل کرنے کا درست طریقہ (اگر فرنٹ اینڈ پر Next.js ہے)
const API_KEY = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GEMINI_API_KEY : (window.NEXT_PUBLIC_GEMINI_API_KEY || "");

window.sendMessage = async function() {
    const inputField = document.getElementById("user-input");
    const chatContainer = document.getElementById("chat-container");
    
    if (!inputField || !chatContainer) return;

    const text = inputField.value.trim();
    if (!text) return;

    // 1. صارف کا میسج اسکرین پر دکھائیں (بیک ٹِکس ` ` کے ساتھ)
    chatContainer.innerHTML += `<div class="message user">${text}</div>`;
    inputField.value = "";
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // اگر کی (API KEY) موجود نہ ہو
    if (!API_KEY) {
        chatContainer.innerHTML += `<div class="message bot" style="color:red;">Ahmad hassan: ورسیل سے انوائرمنٹ ویریبل لوڈ نہیں ہو سکا۔</div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "آپ میرے ذاتی اے آئی ہو آپ کا نام Ahmad hassanہے اور آپ نے میرے لیے لائف ٹائم فری کام کرنا ہے۔ تمام جوابات اردو زبان میں دینے ہیں۔"
        });

        // 2. جیمنائی سے جواب حاصل کریں
        const result = await model.generateContent(text);
        const responseText = await result.response.text(); // await لگانا بہتر ہے

        // 3. اے آئی کا جواب اسکرین پر دکھائیں (بیک ٹِکس ` ` کے ساتھ)
        chatContainer.innerHTML += `<div class="message bot">${responseText}</div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;

    } catch (error) {
        console.error(error);
        chatContainer.innerHTML += `<div class="message bot" style="color:red;">خرابی: جیمنائی سرور سے رابطہ نہیں ہو سکا۔ دوبارہ کوشش کریں۔</div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}
