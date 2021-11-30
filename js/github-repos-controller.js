'use strict';

function onInit() {
    getGithubUsers()
        .then(renderGithubUsers)
        .catch(error => console.log(error))
}

function renderGithubUsers(usersArray) {
    const flatUsersArray = [].concat.apply([], usersArray)
    var strHTMLs = flatUsersArray.map(user => {
        return `<table>
        <tr>
            <td>${user.login}</td>
        </tr>
        <tr>
            <td><img src="${user.avatar_url}"/></td>
        </tr>
        <tr>
            <td class="${user.login}">Repos count:</td>
        </tr>
        </table>`
    })
    document.querySelector('.github-users-container').innerHTML = strHTMLs.join('')
    flatUsersArray.forEach(user => onGetGithubUserReposCount(user.login))

}

function onGetGithubUserReposCount(userName) {
    getGithubUserCountOfRepostiories(userName)
        .then(renderGithubUsersReposCount)
        .catch(error => console.log(error))
}

function renderGithubUsersReposCount(repos) {
    var githubReposIds = getGithubReposUsersLogin()
    
    let githubId = githubReposIds.map(repo => {
        if (fetchingFromServerOrNot()){
            if (repos && repos.length > 0) {
                if (repos[0].owner.login === repo.login) 
                document.querySelector(`.${repo.login}`).innerText = `Repos count: ${repos.length}`
            } else if(repos.length === 0) document.querySelector(`.${repo.login}`).innerText = 'Repos count: 0'
        }
    })
    
    if (!fetchingFromServerOrNot()) repos.map(user => {
            document.querySelector(`.${user.login}`).innerText = `Repos count: ${user.repos}`} 
    )
}