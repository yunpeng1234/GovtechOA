In the project directory, you can run:

### Before starting the project

Create a `env.local` file in the directory `backend` with the 4 environment variables
1. DB_USER
2. DB_PASSWORD
3. DB_PORT
4. DB_NAME
5. DB_HOST
6. TOKEN_TTL
7. JWT_PRIVATE_KEY



### `go mod tidy` to install relevant dependency in 

### `air` to start the backend project

### `npm i` in both `frontend` and root directory

### `npm run dev` to start frontend server

### `concurrently "npm run dev --prefix frontend" "air"` to run both at the same time