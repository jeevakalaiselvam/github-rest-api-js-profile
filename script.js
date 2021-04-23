const APIURL = "https://api.github.com/users/";
const REPOSAPI = "https://api.github.com/users/repos";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const lastSearch = "florinpop17";

getUserData();

async function getUserData(username = "florinpop17") {
    const response = await fetch(APIURL + username);
    const responseData = await response.json();
    createUserCard(responseData);
    getRepos(username);
}

async function getRepos(username) {
    const response = await fetch(APIURL + username + "/repos");
    const responseData = await response.json();
    addReposToCard(responseData);
}

function createUserCard(user) {
    const cardHTML = `
    <div class='card'>
    <div class="img-container">
        <img class="avatar" src="${user.avatar_url}" alt=${user.name} />
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul class="info">
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos}<strong>Repos</strong></li>
        </ul>

        <div id="repos" class="repos">
        </div>
    </div>
     
    </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");
    console.log(reposEl);
    console.log(repos);
    repos.forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;
    lastSearch = search.value;

    if (user) {
        getUserData(user);
        search.value = "";
    }
});
