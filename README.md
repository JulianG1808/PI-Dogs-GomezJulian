<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Dogs

<p align="left">
  <img height="200" src="./dog.png" />
</p>

## Enunciado

La idea general fue crear una aplicación en la cual se puedan ver distintas razas de perro junto con información relevante de las mismas utilizando la api externa [the dog api](https://thedogapi.com/) y a partir de ella poder, entre otras cosas:

  - Buscar perros
  - Filtrarlos / Ordenarlos
  - Agregar nuevos perros

## Comenzar

 1. Forkear el repositorio para tener una copia del mismo en sus cuentas
 2. Clonar el repositorio en sus computadoras para comenzar a trabajar
 3. En la carpet `api` crear un archivo llamado: `.env` que tenga la siguiente forma:
    ```
    DB_USER=usuariodepostgres
    DB_PASSWORD=passwordDePostgres
    DB_HOST=localhost
    API_KEY=4ef3b90f-ab14-4a75-9545-89c5bc01ef5a
    ```
    Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres.
    Adicionalmente será necesario que crees desde psql una base de datos llamada `dogs`.
 4. Una vez completado este paso, desde la consola, y parado en la carpeta <strong>'api'</strong>, correr los comandos ```npm install``` para instalar las dependencias. Luego, ```npm start``` para levantar la base de datos y correr el Back-end.
 5. Repetir los comandos en otra consola, pero parado en la carpeta <strong>'client'</strong>.
 6. El proyecto debería estarse corriendo en la ruta <em>localhost:3000</em> en tu navegador.

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

 * __Node__: 12.18.3 o mayor
 * __NPM__: 6.14.16 o mayor

Para verificar que versión tienen instalada:

> node -v
>
> npm -v

#### Tecnologías utilizadas:
- [ ] JavaScript
- [ ] HTML
- [ ] CSS
- [ ] React
- [ ] Redux
- [ ] Node
- [ ] Express
- [ ] SQL
- [ ] Sequelize
- [ ] Postgres
