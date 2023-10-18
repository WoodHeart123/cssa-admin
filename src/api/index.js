import request from '@/utils/request'

export function fetchUserData() {
    return request.get('https://api.github.com/users/woai3c')
}

export function login(username, password){
    return request.post('/api/admin/login', {
        username: username,
        password: password
    })
}

export function getAdminList(){
    return request.get('/api/admin/list')
}

export function sendEmail(receiver, subject, message){
    return request.post('/api/email/send', {
        subject: subject,
        message: message,
        receiver: receiver
    })
}

export function invite(username){
    return request.get('/api/admin/invite?username=' + username)
}