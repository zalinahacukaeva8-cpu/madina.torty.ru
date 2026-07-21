import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCSyUe8XD2FUh1YCp8uNaouBtZzi1Ail7I",
  authDomain: "madina-torty.firebaseapp.com",
  projectId: "madina-torty",
  storageBucket: "madina-torty.firebasestorage.app",
  messagingSenderId: "323694649487",
  appId: "1:323694649487:web:08a7fe2731b9f1e68ad0fa",
  measurementId: "G-TSV4XY8TY2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📊 СЧЁТЧИК ПОСЕЩЕНИЙ
let visits = localStorage.getItem("visits");

if (!visits) {
    visits = 0;
}

visits = Number(visits) + 1;
localStorage.setItem("visits", visits);

let selectedStars = 0;
let isAdmin = false;


// Выбор звезд
function rate(number) {
    selectedStars = number;

    let stars = document.querySelectorAll(".stars span");

    stars.forEach((star, index) => {
        if (index < number) {
            star.classList.add("active");
            star.innerHTML = "★";
        } else {
            star.classList.remove("active");
            star.innerHTML = "☆";
        }
    });
}


// Добавление отзыва
async function addReview() {

    let name = document.getElementById("name").value.trim();
    let text = document.getElementById("reviewText").value.trim();


    if (text === "") {
       showToast("❤️ Напишите отзыв","info");
        return;
    }


    if (selectedStars === 0) {
      showToast("⭐ Выберите оценку","info");
        return;
    }


    if (name === "") {
        name = "Аноним";
    }


    let review = document.createElement("div");


    let deleteButton = "";


    if (isAdmin) {
        deleteButton =
        '<button onclick="this.parentElement.remove()">🗑 Удалить</button>';
    }


    review.innerHTML = `
        <h3>${name}</h3>
        <p style="color:gold; font-size:25px;">
        ${"★".repeat(selectedStars)}
        </p>
        <p>${text}</p>
        ${deleteButton}
    `;


    document.getElementById("reviewList")
    .appendChild(review);

await addDoc(
  collection(db, "Reviews"),
  {
    name: name,
    text: text,
    stars: selectedStars,
    date: Date.now()
  }
);

    document.getElementById("name").value = "";
    document.getElementById("reviewText").value = "";


    selectedStars = 0;


    document.querySelectorAll(".stars span")
    .forEach(star => {
        star.classList.remove("active");
        star.innerHTML = "☆";
    });

}


// Вход владельца
function adminLogin() {

    let password = prompt(
        "Введите пароль владельца"
    );


    if (password === "madina123") {

        isAdmin = true;

       showToast("👑 Вы вошли как владелец","success");
        );

document.getElementById("adminPanelButton")
.style.display = "block";

    } else {

       showToast("❌ Неверный пароль","error");
        );

    }

}
function toggleAdminPanel() {

    let panel = document.getElementById("adminPanel");

    if (panel.style.display === "none") {
        panel.style.display = "block";
    } else {
        panel.style.display = "none";
    }

}

function showStats() {
    let visits = localStorage.getItem("visits") || 0;
    let reviews = document.querySelectorAll("#reviewList div").length;

    alert(
        "📊 СТАТИСТИКА\n\n" +
        "👀 Посещения: " + visits + "\n" +
        "💬 Отзывы: " + reviews
    );
}

window.onload = async function () {

  const snapshot =
    await getDocs(collection(db, "Reviews"));

  snapshot.forEach((doc) => {

    const r = doc.data();

    let review =
      document.createElement("div");

    review.innerHTML = `
      <h3>${r.name}</h3>
      <p style="color:gold;font-size:25px;">
        ${"★".repeat(r.stars)}
      </p>
      <p>${r.text}</p>
    `;

    document
      .getElementById("reviewList")
      .appendChild(review);
  });

};

window.rate = rate;
window.addReview = addReview;
window.adminLogin = adminLogin;
window.toggleAdminPanel = toggleAdminPanel;
window.showStats = showStats;

window.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("loader-hide");

        setTimeout(() => {

            loader.remove();

        },700);

    },2200);

});

document.addEventListener("DOMContentLoaded", () => {

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }

    });

    window.scrollToTop = function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

});

function showToast(text,type="success"){

    const toast=document.getElementById("toast");

    toast.className="";

    toast.classList.add(type);

    toast.classList.add("show");

    toast.innerHTML=text;

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}
