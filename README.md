# Debug-nodejs

## Install
For usage you need postgresql and npm i


## Usage
Send for user
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