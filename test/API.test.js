import {userInfo} from '../API/UserInfo' 
global.fetch = require('node-fetch');

test ('Test Get Notification', () => { 
    return userInfo.getNotifications().then(data => {
        expect((data.length-1)>=0).toBe(true);
    });
})

test ('Test Search Repository', () => { 
    return userInfo.repoSearch('react').then(data => {
        expect(data.items[0].name).toBe('react');
    });
})

test ('Test Commit Stats', () => { 
    return userInfo.getCommitStats('facebook','react').then(data => {
        expect(data.length).toBe(52);
    });
})

test ('Test Search User', () => { 
    return userInfo.userSearch('zzhu41').then(data => {
        expect(data.items[0].login).toBe('zzhu41');
    });
})

test ('Test Starred Info', () => { 
    return userInfo.getStarredInfo('zzhu41').then(data => {
        expect(data.length).toBe(18);
    });
})


test ('Test Get Basic User Info', () => { 
    return userInfo.getUserInfo('zzhu41').then(data => {
        expect(data.login).toBe('zzhu41');
        expect(data.name).toBe('Zhanyan Zhu');
        expect(data.bio).toBe('UIUC2019');
        expect(data.created_at).toBe('2017-01-29T03:34:05Z');
    });
})

test ('Test Get Repo Info', () => { 
    return userInfo.getRepoInfo('zzhu41').then(data => {
        expect(data.length).toBe(9);
    });
})

test ('Test Get Follower', () => { 
    return userInfo.getFollowers('zzhu41').then(data => {
        expect(data.length).toBe(6);
    });
})

test ('Test Get Following', () => { 
    return userInfo.getFollowing('zzhu41').then(data => {
        expect(data.length).toBe(7);
    });
})