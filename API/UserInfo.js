const url = 'https://api.github.com';
const username = 'zzhu41';

export const userInfo = {
    async getUserInfo() {
        return await fetch(`${url}/users/${username}`)
        .then((res) => {
            return res.json();
        })
    },
    async getRepoInfo() {
        return await fetch(`${url}/users/${username}/repos`)
        .then((res) => {
            return res.json();
        })
    },
    async getFollowers() {
        return await fetch(`${url}/users/${username}/followers`)
        .then((res) => {
            return res.json();
        })
    },
    async getFollowing() {
        return await fetch(`${url}/users/${username}/following`)
        .then((res) => {
            return res.json();
        })
    }
}