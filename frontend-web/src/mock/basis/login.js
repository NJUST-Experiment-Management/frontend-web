let Login = {
    "code": '0',
    "msg": "success",
    "data": {
        "userId":"99999999",
        "password":"123456",
        "userName":"fishHead",
        "userPhone":"911",
        "userType": "admin"
    }
}

export default {
    'post|/api/login': option => {
        return Login
    }
}
