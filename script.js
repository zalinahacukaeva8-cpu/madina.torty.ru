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
function addReview() {

    let name = document.getElementById("name").value.trim();
    let text = document.getElementById("reviewText").value.trim();


    if (text === "") {
        alert("Напишите отзыв ❤️");
        return;
    }


    if (selectedStars === 0) {
        alert("Выберите оценку ⭐");
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

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

reviews.push({
    name: name,
    text: text,
    stars: selectedStars
});

localStorage.setItem("reviews", JSON.stringify(reviews));


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

        alert(
            "Вы вошли как владелец 👑"
        );

document.getElementById("adminPanelButton")
.style.display = "block";

    } else {

        alert(
            "Неверный пароль ❌"
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

window.onload = function() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    for (let r of reviews) {
        let review = document.createElement("div");

        review.innerHTML = `
            <h3>${r.name}</h3>
            <p style="color:gold; font-size:25px;">
                ${"★".repeat(r.stars)}
            </p>
            <p>${r.text}</p>
        `;

        document.getElementById("reviewList").appendChild(review);
    }
};