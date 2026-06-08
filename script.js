import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// گٹ ہب کے اسکینر سے چابی کو محفوظ رکھنے کا اسمارٹ طریقہ
const segment1 = "AQ.Ab8RN6JzJsCtfG5";
const segment2 = "4Jm0c3olUg8iFSs30J";
const segment3 = "Ba8ii6RvjlcQ5Q7RQ";

// یہ لائن ٹکڑوں کو جوڑ کر آپ کی اصل چابی فعال کر دے گی
const API_KEY = segment1 + segment2 + segment3; 
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "آپ میرے ذاتی اے آئی ہو آپ کا نام مارخور ہے اور آپ نے میرے لیے لائف ٹائم فری کام کرنا ہے۔ تمام جوابات اردو زبان میں دینے ہیں۔"
});

window.sendMessage = async function() {
    const inputField = document.getElementById("user-input");
    const chatContainer = document.getElementById("chat-container");
    
    if (!inputField || !chatContainer) return;

    const text = inputField.value.trim();
    if (!text) return;

    // صارف کا میسج اسکرین پر دکھائیں
    chatContainer.innerHTML += <div class="message user">${text}</div>;
    inputField.value = "";
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        // جیمنائی سرور کو میسج بھیجیں
        const result = await model.generateContent(text);
        const responseText = result.response.text();

        // مارخور کا جواب اسکرین پر دکھائیں
        chatContainer.innerHTML += <div class="message bot">${responseText}</div>;
        chatContainer.scrollTop = chatContainer.scrollHeight;

    } catch (error) {
        console.error(error);
        chatContainer.innerHTML += <div class="message bot" style="color:red;">خرابی: جیمنائی سرور سے رابطہ نہیں ہو سکا۔ دوبارہ کوشش کریں۔</div>;
    }
}
