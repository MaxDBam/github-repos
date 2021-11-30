'use strict';

var gGithubRepos = [];
const STORAGE_KEY = 'users'
const STORAGE_USER = 'user'
var gUsers = []
var gFetchFromServer = true

function getGithubUsers() {
    var users = loadFromStorage(STORAGE_KEY)
    if (users){
        console.log('Fetching from cache')
        gFetchFromServer = false
        gGithubRepos = users
        return new Promise((resolve) => resolve(users))
    } 

    console.log('Fetching from Server');
    return axios.get('https://api.github.com/users')
        .then(res => {
            saveToStorage(STORAGE_KEY, res.data)
            gGithubRepos = res.data
            return res.data
        })
        .catch(error => console.log(error))
}

function getGithubUserCountOfRepostiories(userName) {
    const user = loadFromStorage(STORAGE_USER) 
    if (user && user.some(userLogin => userLogin.login === userName)){
        gFetchFromServer = false
        return new Promise(resolve => resolve(user))
    } 


    return axios.get(`https://api.github.com/users/${userName}/repos`)
        .then(res => {
                gUsers.push({
                    login: userName,
                    repos: res.data.length
                })
            saveToStorage(STORAGE_USER, gUsers)
            return res.data
        }) 
        .catch(error => console.log(error))
}

function getAllGithubUsersInfo() {
    return Promise.all([getGithubUserCountOfRepostiories()])
        .then(results => results)
        .catch(error => console.log(error))
}

function getGithubReposUsersLogin() {
    return gGithubRepos
}

function fetchingFromServerOrNot() {
    return gFetchFromServer
}