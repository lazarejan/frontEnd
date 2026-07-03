const API_URL = "https://finalspaceapi.com/api/v0";

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initBurgerMenu();
    initWatchlist();
    
    fetchCharacters();
    fetchEpisodes();
    fetchQuotes();
    fetchLocations();
});
function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-item");
    
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("data-target");
            
            document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("active"));
            document.getElementById(target).classList.add("active");
            
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            
            document.querySelector(".nav-links").classList.remove("nav-active");
            document.querySelector(".burger").classList.remove("toggle");
            
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
}
function initBurgerMenu() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    
    burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");
        burger.classList.toggle("toggle");
    });
}




async function fetchCharacters() {
    const grid = document.getElementById("characters-grid");
    try {
        const response = await fetch(`${API_URL}/character`);
        const data = await response.json();
        
        grid.innerHTML = "";
        data.slice(0, 12).forEach(char => {
            grid.innerHTML += `
                <div class="card">
                    <img src="${char.img_url}" alt="${char.name}" onerror="this.src='https://via.placeholder.com/300x250'">
                    <div class="card-info">
                        <h3>${char.name}</h3>
                        <p><strong>Species:</strong> ${char.species}</p>
                        <p><strong>Origin:</strong> ${char.origin}</p>
                        <p><strong>Status:</strong> ${char.status}</p>
                    </div>
                </div>
            `;
        });
    } catch (err) {
        grid.innerHTML = "<p>Error connecting to character logs.</p>";
    }
}

async function fetchEpisodes() {
    const grid = document.getElementById("episodes-grid");
    try {
        const response = await fetch(`${API_URL}/episode`);
        const data = await response.json();
        
        grid.innerHTML = "";
        data.slice(0, 12).forEach(ep => {
            grid.innerHTML += `
                <div class="card">
                    <img src="${ep.img_url}" alt="${ep.name}" onerror="this.src='https://via.placeholder.com/300x250'">
                    <div class="card-info">
                        <h3>${ep.name}</h3>
                        <p><strong>Air Date:</strong> ${ep.air_date}</p>
                        <p><strong>Director:</strong> ${ep.director}</p>
                    </div>
                </div>
            `;
        });
    } catch (err) {
        grid.innerHTML = "<p>Error connecting to episode logs.</p>";
    }
}

async function fetchQuotes() {
    const grid = document.getElementById("quotes-grid");
    try {
        const response = await fetch(`${API_URL}/quote`);
        const data = await response.json();
        
        grid.innerHTML = "";
        data.slice(0, 12).forEach(q => {
            grid.innerHTML += `
                <div class="card">
                    <div class="card-info">
                        <p style="font-style: italic; margin-bottom: 10px; color: #fff;">"${q.quote}"</p>
                        <p><strong>- ${q.by}</strong></p>
                    </div>
                </div>
            `;
        });
    } catch (err) {
        grid.innerHTML = "<p>Error loading quotes.</p>";
    }
}

async function fetchLocations() {
    const grid = document.getElementById("locations-grid");
    try {
        const response = await fetch(`${API_URL}/location`);
        const data = await response.json();
        
        grid.innerHTML = "";
        data.slice(0, 12).forEach(loc => {
            grid.innerHTML += `
                <div class="card">
                    <img src="${loc.img_url}" alt="${loc.name}" onerror="this.src='https://via.placeholder.com/300x250'">
                    <div class="card-info">
                        <h3>${loc.name}</h3>
                        <p><strong>Type:</strong> ${loc.type}</p>
                    </div>
                </div>
            `;
        });
    } catch (err) {
        grid.innerHTML = "<p>Error updating space map routes.</p>";
    }
}


let watchlist = JSON.parse(localStorage.getItem("finalSpaceWatchlist")) || [];

function initWatchlist() {
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("todo-add-btn");
    
    addButton.addEventListener("click", () => {
        const text = todoInput.value.trim();
        if (text) {
            watchlist.push(text);
            todoInput.value = "";
            renderWatchlist();
        }
    });
    
    renderWatchlist();
}

function renderWatchlist() {
    localStorage.setItem("finalSpaceWatchlist", JSON.stringify(watchlist));
    const listElement = document.getElementById("todo-list");
    listElement.innerHTML = "";
    
    watchlist.forEach((item, index) => {
        listElement.innerHTML += `
            <li>
                <span>${item}</span>
                <button class="delete-btn" onclick="removeWatchlistItem(${index})">Remove</button>
            </li>
        `;
    });
}

window.removeWatchlistItem = function(index) {
    watchlist.splice(index, 1);
    renderWatchlist();
};