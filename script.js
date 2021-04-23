//API Reference point initialization
const APIURL = "https://api.github.com/users/";
const REPOSAPI = "https://api.github.com/users/repos";

//References to DOM elements
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
let lastSearch = "florinpop17";

//Get initial default user data
getUserData();

/**
 * @author Jeeva Kalaiselvam
 * @param {string} username Github username
 */
async function getUserData(username = "jeevakalaiselvam") {
    const response = await fetch(APIURL + username);
    const responseData = await response.json();
    createUserCard(responseData);
    getRepos(username);
}

/**
 * @author Jeeva Kalaiselam
 * @param {string} username Github username
 */
async function getRepos(username) {
    const response = await fetch(APIURL + username + "/repos");
    const responseData = await response.json();
    //Add obtained repos to profile card
    addReposToCard(responseData);
}

/**
 * This function will generate a profile card and populate it with data obtained from user data object
 * @author Jeeva Kalaiselvam
 * @param {Object} user Profile object obtained from Github REST servics
 */
function createUserCard(user) {
    //Profile card element creation
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

/**
 * @author Jeeva Kalaiselvam <jeevak001@outlook.com>
 * @param {Object} repos - Repository Objects containing all repositories
 */
function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");
    console.log(reposEl);
    console.log(repos);
    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");
            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;
            reposEl.appendChild(repoEl);
        });
}

//Check for user pressing enter and prevent default behaviour
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;
    lastSearch = search.value;

    if (user) {
        //If user typed in a value, Get data for that user from Github REST
        getUserData(user);
        search.value = "";
    }
});
