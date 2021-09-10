# Authentication Middleware

> ## Flow
1. Frontend makes a request to Firebase Auth
2. Frontend receives a response with a token
3. Frontend sends the token on requests
4. Backend validates auth token on Firebase
5. If token is invalid, block request

> ## Props
- accessToken*
- providerId*
- signInMethod*

> ## UseCase
1. [] Receives a request with props o Headers
2. [] Validate required props
3. [] If token is valid, proceed with the request
4. [] If token is invalid, return a 401 status code
