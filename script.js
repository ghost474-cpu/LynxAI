const messages = document.getElementById("messages");
const suggestBtn = document.getElementById("suggestBtn");
const suggestions = document.getElementById("suggestions");

// =======================
// 🧠 تنسيق النص
// =======================
function formatText(text) {
  return text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "")
    .map(line => {

      if (line.startsWith("# ")) {
        return `<h2 class="title">${line.replace("# ", "")}</h2>`;
      }

      if (line.startsWith("## ")) {
        return `<h3 class="subtitle">${line.replace("## ", "")}</h3>`;
      }

      if (line.startsWith("- ")) {
        return `<li>${line.replace("- ", "")}</li>`;
      }

      return `<p>${line}</p>`;
    })
    .join("");
}

// =======================
// ➕ إضافة رسالة
// =======================
function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("msg", type);

  div.innerHTML = `<div class="bubble">${formatText(text)}</div>`;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;

  return div; // 👈 مهم
}

// =======================
// 🖼️ VISION MODE
// =======================
function showImages() {
  const div = document.createElement("div");
  div.classList.add("msg", "bot");

  div.innerHTML = `
    <div class="bubble image-bubble">
      <h3 class="title">Vision activée...</h3>
      <p>Accès aux archives visuelles...</p>

      <div class="img-grid">
        <img src="Vivant.jpg" class="chat-img">
        <img src="paris.png" class="chat-img">
        <img src="fly.jpg" class="chat-img">
        <img src="cart.png" class="chat-img">
      </div>
    </div>
  `;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// =======================
// 📂 تحديد الملفات
// =======================
function getFile(key) {
  switch (key) {
    case "ai": return "ai.txt";
    case "robots": return "robot.txt";
    case "voitures": return "voiture.txt";
    case "médecine": return "medcine.txt";
    case "monde": return "monde.txt";
    case "villes": return "villes.txt";
    case "espace": return "espace.txt";
    case "serveau": return "serveau.txt";
    case "moi": return "moi.txt";
    case "vision": return "VISION_MODE";
    default: return null;
  }
}

// =======================
// 📥 تحميل النص
// =======================
async function loadText(file) {
  try {
    const res = await fetch(file);
    return await res.text();
  } catch (err) {
    console.error(err);
    return "Erreur de chargement.";
  }
}

// =======================
// 💬 تشغيل السؤال (🔥 احترافي)
// =======================
async function ask(key, text) {
  addMessage(text, "user");

  // 🧠 رسالة التفكير (واحدة فقط)
  const thinkingMsg = addMessage("Analyse en cours...", "bot");

  // تغيير النص
  setTimeout(() => {
    thinkingMsg.querySelector(".bubble").innerHTML = "Connexion aux données du futur...";
  }, 1200);

  // حذفها ثم عرض النتيجة
  setTimeout(async () => {

    thinkingMsg.remove(); // 👈 حذف الرسالة

    if (key === "vision") {
      showImages();
      return;
    }

    const file = getFile(key);

    if (!file) {
      addMessage("Question inconnue.", "bot");
      return;
    }

    const answer = await loadText(file);
    addMessage(answer, "bot");

  }, 2500);
}

// =======================
// 💡 الاقتراحات
// =======================
suggestBtn.onclick = () => {
  suggestions.classList.toggle("hidden");
};

document.querySelectorAll(".sugg").forEach(btn => {
  btn.onclick = () => {
    ask(btn.dataset.q, btn.textContent);
    suggestions.classList.add("hidden");
  };
});

// =======================
// 🖼️ LIGHTBOX
// =======================
let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightbox-img");

if (!lightbox) {
  lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.className = "lightbox hidden";

  lightbox.innerHTML = `<img id="lightbox-img">`;

  document.body.appendChild(lightbox);
  lightboxImg = document.getElementById("lightbox-img");
}

// فتح الصورة
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("chat-img")) {
    lightbox.classList.remove("hidden");
    lightboxImg.src = e.target.src;
  }
});

// إغلاق
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
  }
});