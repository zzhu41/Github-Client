import { personalToken } from '../auth';

const url = 'https://api.github.com';

export const userInfo = {
    async getCommitStats(user, repo) {
        return await fetch(`${url}/repos/${user}/${repo}/stats/commit_activity`, {
            headers: {
              'Cache-Control': 'no-cache'
            }
        })
        .then((res) => {
            return res.json();
        })
    },
    /**
     * search for repositories
     * @param {*} repoName 
     */
    async repoSearch(repoName) {
        if (repoName === null) {
            return;
        }
        return await fetch(`${url}/search/repositories?q=${repoName}`, {
            headers: {
              'Cache-Control': 'no-cache'
            }
        })
        .then((res) => {
            return res.json();
        })
    },
    async userSearch(userName) {
        if (userName === null) {
            return;
        }
        return await fetch(`${url}/search/users?q=${userName}`, {
            headers: {
              'Cache-Control': 'no-cache'
            }
        })
        .then((res) => {
            return res.json();
        })
    },
    /**
     * get basic user info
     */
    async getUserInfo(user) {
        return await fetch(`${url}/users/${user}`, {
            headers: {
              'Cache-Control': 'no-cache'
            }
        })
        .then((res) => {
            return res.json();
        })
    },
    /**
     * get repository infomation
     */
    async getRepoInfo(user) {
        return await fetch(`${url}/users/${user}/repos`, {
            headers: {
              'Cache-Control': 'no-cache'
            }
        })
        .then((res) => {
            return res.json();
        })
    },
    async getStarredInfo(user) {
        return await fetch(`${url}/users/${user}/starred`, {
            headers: {
              'Cache-Control': 'no-cache'
            }
        })
        .then((res) => {
            return res.json();
        })
    },
    /**
     * get all followers
     */
    async getFollowers(user) {
        return await fetch(`${url}/users/${user}/followers`, {
            headers: {
              'Cache-Control': 'no-cache'
            }
        })
        .then((res) => {
            return res.json();
        })
    },
    /**
     * get people you are following
     */
    async getFollowing(user) {
        return await fetch(`${url}/users/${user}/following`, {
            headers: {
              'Cache-Control': 'no-cache'
            }
        })
        .then((res) => {
            return res.json();
        })
    },
    /**
     * Follow a user
     * PUT /user/following/:username
     * @param {*} user 
     */
    async followUser(user) {
        return fetch(`${url}/user/following/${user}?access_token=${personalToken}`,
            {   
                method: 'PUT',
                headers: {
                    'Content-Length': 0,
                }})
            .then((response) => 
            {
                console.log(response);
            })
            .catch((error) => 
            {
                console.error(error)
            });
    },
    /**
     * unfollow a user
     */
    async unfollowUser(user) {
        return fetch(`${url}/user/following/${user}?access_token=${personalToken}`,
            {   
                method: 'DELETE',
                headers: {
                    'Content-Length': 0,
                }})
            .then((response) => 
            {
                console.log(response);
            })
            .catch((error) => 
            {
                console.error(error)
            });
    },
    async starRepo(owner, repo) {
        return fetch(`${url}/user/starred/${owner}/${repo}?access_token=${personalToken}`,
            {   
                method: 'PUT',
                headers: {
                    'Content-Length': 0,
                }})
            .then((response) => 
            {
                console.log(response);
            })
            .catch((error) => 
            {
                console.error(error)
            });
    },
    async unstarRepo(owner, repo) {
        return fetch(`${url}/user/starred/${owner}/${repo}?access_token=${personalToken}`,
            {   
                method: 'DELETE',
                headers: {
                    'Content-Length': 0,
                }})
            .then((response) => 
            {
                console.log(response);
            })
            .catch((error) => 
            {
                console.error(error)
            });
    }
}