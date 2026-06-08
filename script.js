import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// آپ کی فراہم کردہ API Key یہاں لگا دی گئی ہے
const API_KEY = "AQ.Ab8RN6Kw-qorGmOYPQo8irLZbtZ1cCo3L4P33uOToxVTUc7Cgg"; 

window.sendMessage = async function() {
    const inputField = document.getElementById("user-input");
    const chatContainer = document.getElementById("chat-container");
    
    if (!inputField || !chatContainer) return;

    const text = inputField.value.trim();
    if (!text) return;

    // 1. صارف کا میسج اسکرین پر دکھائیں
    chatContainer.innerHTML += `<div class="message user">${text}</div>`;
    inputField.value = "";
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // اگر کسی وجہ سے چابی موجود نہ ہو
    if (!API_KEY) {
        chatContainer.innerHTML += `<div class="message bot" style="color:red;">مارخور: API Key نہیں مل سکی۔</div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "آپ میرے ذاتی اے آئی ہو آپ کا نام مارخور ہے اور آپ نے میرے لیے لائف ٹائم فری کام کرنا ہے۔ تمام جوابات اردو زبان میں دینے ہیں۔"
        });

        // 2. جیمنائی سے جواب حاصل کریں
        const result = await model.generateContent(text);
        const responseText = result.response.text();

        // 3. اے آئی کا جواب اسکرین پر دکھائیں
        chatContainer.innerHTML += `<div class="message bot">${responseText}</div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;

    } catch (error) {
        console.error(error);
        // اگر چابی غلط ہو تو یہ ایرر آئے گا
        chatContainer.innerHTML += `<div class="message bot" style="color:red;">خرابی: جیمنائی سرور سے رابطہ نہیں ہو سکا۔ (براہِ کرم چیک کریں کہ آپ کی API Key درست ہے یا نہیں)</div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}
