# Debug-nodejs

## Install
For usage you need postgresql and npm i


## Usage
Send for user

* Signup {POST} http://localhost:4000/api/auth/signup
* Signin {POST} http://localhost:4000/api/auth/signin
```javascript
{
    "user": {
        "full_name": "Full name",
        "username": "name_user",
        "passwordhash": "passwo",
        "email": "test@test.com",
    }
} 
```
Send for game


* Create {POST} http://localhost:4000/api/game/create
* Update {PUT} http://localhost:4000/api/game/update/{id}
* Get game {GET} http://localhost:4000/api/game/{id}
* Get All game {GET} http://localhost:4000/api/game/all
* Delete {DELETE} http://localhost:4000/api/game/{id}
```javascript
{
    "game": {
        "title": "Title",
        "owner_id": 1,
        "studio": "studio",
        "esrb_rating": "test",
        "user_rating": 2,
        "have_played": true
    },
    "user": {
        "id": 2
    }
}
```