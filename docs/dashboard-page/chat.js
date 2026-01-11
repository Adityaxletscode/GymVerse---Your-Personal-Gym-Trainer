const logOutBtn = document.querySelector('.log-out');
const prompt = document.getElementById("prompt");
const chatBody = document.querySelector(".chat-body");
const submit = document.getElementById("submit");

const Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCQYz-s9O8tHJJu9yJwRNZTV7W-I2hNezg";

const user = { data: null };

const fitnessKeywords = [
  "hi", "hello", "hey","Thank you","thank you","Thanks","thanks",


  "fitness", "workout", "exercise", "gym", "trainer", "training", "personal trainer",
  "routine", "plan", "schedule",

  "abs", "core", "biceps","tricep", "triceps", "legs","leg", "chest", "shoulders","shoulder", "muscle","muscles","fat loss", "weight loss", "gain", "bulk", "cut", "lean", "metabolism", "bmi",

  "bodypump", "crossfit", "weight training", "bootcamp", "mind & body", "yoga", "pilates", 
  "stretching", "dance", "zumba", "dance fitness", "aerobics",
  "cardio", "endurance", "spinning", "hiit", "circuit training", "boxing", "self defence",

  "nutrition", "diet", "protein", "calories", "fat", "macros", "supplements", "hydration","creatine","creatine monohydrate",

  "sleep", "rest day", "flexibility", "recovery","short","simple","words"
];

logOutBtn.addEventListener("click", () => {
  window.location.href = "../public/index.html";
});

// ✅ Utility: Create user/AI chat box
function createChatBox(html, className) {
  const div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(className);
  return div;
}

async function generateResponse(aiChatBox) {
  const text = aiChatBox.querySelector(".ai-chat-area");
  const requestOption = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: user.data }] }]
    })
  };

  try {
    const response = await fetch(Api_Url, requestOption);
    const data = await response.json();
    const apiResponse = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, "$1")                   
      .replace(/(\r\n|\r|\n)/g, '\n')                     
      .replace(/(\n)?(\d+\.|\*|-)\s*/g, '\n$2 ')          
      .replace(/\n{2,}/g, '\n')                           
      .trim();

    const formatted = apiResponse.replace(/\n/g, "<br>"); 
    text.innerHTML = formatted;
  } catch (e) {
    text.innerHTML = "Unable to get a response. Please try again later.";
    console.error(e);
  } finally {
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  }
}

function handleChatResponse(message) {
  user.data = message.trim();
  if (user.data === "") return;

  const isFitnessRelated = fitnessKeywords.some(keyword =>
    user.data.toLowerCase().includes(keyword.toLowerCase())
  );

  const userHTML = `
    <div class="user-chat-area">${user.data}</div>
    <svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"/>
      <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"/>
    </svg>
  `;
  prompt.value = "";
  const userChatBox = createChatBox(userHTML, "user-chat-box");
  chatBody.appendChild(userChatBox);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

  if (!isFitnessRelated) {
    const fallbackHTML = `
      <svg width="800px" height="800px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px;}</style></defs><path class="cls-1" d="M10.09,1.5h3.83a2.87,2.87,0,0,1,2.87,2.87V9.15A4.78,4.78,0,0,1,12,13.93h0A4.78,4.78,0,0,1,7.22,9.15V4.37A2.87,2.87,0,0,1,10.09,1.5Z"/><path class="cls-1" d="M7.22,5.33h9.57a0,0,0,0,1,0,0v0A2.87,2.87,0,0,1,13.91,8.2H10.09A2.87,2.87,0,0,1,7.22,5.33v0A0,0,0,0,1,7.22,5.33Z"/><path class="cls-1" d="M3.39,23.5v-1A8.62,8.62,0,0,1,12,13.93h0a8.62,8.62,0,0,1,8.61,8.61v1"/><circle class="cls-1" cx="12" cy="20.63" r="0.96"/><line class="cls-1" x1="12.96" y1="23.5" x2="12.96" y2="20.63"/><polyline class="cls-1" points="7.22 13.94 12 19.67 16.78 13.94"/></svg>
      <div class="ai-chat-area">Please ask fitness-related questions only.</div>
    `;
    const fallbackBox = createChatBox(fallbackHTML, "ai-chat-box");
    chatBody.appendChild(fallbackBox);
    return;
  }

  // Loading and then fetch response
  setTimeout(() => {
    const loadingHTML = `
      <svg width="800px" height="800px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px;}</style></defs><path class="cls-1" d="M10.09,1.5h3.83a2.87,2.87,0,0,1,2.87,2.87V9.15A4.78,4.78,0,0,1,12,13.93h0A4.78,4.78,0,0,1,7.22,9.15V4.37A2.87,2.87,0,0,1,10.09,1.5Z"/><path class="cls-1" d="M7.22,5.33h9.57a0,0,0,0,1,0,0v0A2.87,2.87,0,0,1,13.91,8.2H10.09A2.87,2.87,0,0,1,7.22,5.33v0A0,0,0,0,1,7.22,5.33Z"/><path class="cls-1" d="M3.39,23.5v-1A8.62,8.62,0,0,1,12,13.93h0a8.62,8.62,0,0,1,8.61,8.61v1"/><circle class="cls-1" cx="12" cy="20.63" r="0.96"/><line class="cls-1" x1="12.96" y1="23.5" x2="12.96" y2="20.63"/><polyline class="cls-1" points="7.22 13.94 12 19.67 16.78 13.94"/></svg>
      <div class="ai-chat-area"><img src="../images/Loading_icon.gif" alt="Loading..." class="load"></div>
    `;
    const aiChatBox = createChatBox(loadingHTML, "ai-chat-box");
    chatBody.appendChild(aiChatBox);
    generateResponse(aiChatBox);
  }, 600);
}

// ✅ Handle enter key and submit button
prompt.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleChatResponse(prompt.value);
});
submit.addEventListener("click", () => {
  handleChatResponse(prompt.value);
});

const sidebar = document.querySelector('.left-container');
const toggleBtn = document.querySelector('.sidebar-toggle');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('shrink');
});
