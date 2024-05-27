## Description

Solucion planteada a prueba tenica Nelumbo

## Instalacion
Version de node en la que se desarollo el proyecto:
`v18.20.1`
```bash
$ npm install
```
## Para correr App

Crear archivo .env ( a continuacion el template )
```
PORT=
DB_HOST=
DB_PORT=
USERNAME_DB=
DB_PASSWORD=
DATABASE=
JWT_SECRET=sAS%%2@
PRELOAD_EMAIL=
PRELOAD_PASSWORD=  
```

Luego corremos un servicio y la app
```bash
# levantamos un contenedor para la base de datos 
docker run --name parkingdb 
-e POSTGRES_PASSWORD=test 
-e POSTGRES_DB=parking 
-e POSTGRES_USER=test 
-p 5431:5432 
-d postgres:alpine

# development
$ npm run dev

# production mode
$ npm run start
```
