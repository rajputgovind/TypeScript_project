"use strict";
// console.log("hello world i am govind rajput what is going on now i")
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
async function myCustomFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network response was not ok - status : ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}
// Show the data in user Interface
const showResultUI = (singleUser) => {
    const { login, location, avatar_url, url } = singleUser;
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <div class = 'card'>
    <img src = ${avatar_url} alt = ${login}/>
    <p style="color:white">${login}</p>
    </div>

    <div class= "card-footer">
        <img src=${avatar_url} alt= ""${login}/>
        <a href= ${url} >Github</a>
    </div>
  `;
    main_container.insertAdjacentElement("beforeend", newDiv);
};
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
        }
    });
}
//default function call
fetchUserData("https://api.github.com/users");
// let perform search functionality
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserData = await myCustomFetcher(url, {});
        const matchingUsers = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        // we need to clear the previous data
        main_container.innerHTML = "";
        const newPara = document.createElement("p");
        newPara.innerHTML = `
    <p class = "empty-msg">No matching users found</p>
    `;
        if (matchingUsers.length === 0) {
            main_container.insertAdjacentElement("beforeend", newPara);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
