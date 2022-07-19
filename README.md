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

## ¿Quieres probar mi proyecto?

 1. Clonar el repositorio en sus computadoras, puedes hacerlo utilizando el comando `git clone https://github.com/JulianG1808/PI-Dogs-GomezJulian.git` en <strong>'git bash'</strong>
 2. En la carpeta `api` crear un archivo llamado: `.env` que tenga la siguiente forma:
    ```
    DB_USER=usuariodepostgres
    DB_PASSWORD=passwordDePostgres
    DB_HOST=localhost
    PORT=3001
    API_KEY=93e0ca3b-2f7e-42fb-97ac-2cc45a83e01c
    ```
    Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres.
    Adicionalmente será necesario que crees desde <strong>PostgresSQL</strong> una base de datos llamada `dogs`.
 3. Una vez completado este paso, desde la consola, y parado en la carpeta <strong>'api'</strong>, correr los comandos ```npm install``` para instalar las dependencias. Luego, ```npm start``` para levantar la base de datos y correr el Back-end.
 4. Repetir los comandos en otra consola, pero parado en la carpeta <strong>'client'</strong>.
 5. El proyecto debería estarse corriendo en la ruta <em>localhost:3000</em> en tu navegador.

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

 * __Node__: 12.18.3 o mayor
 * __NPM__: 6.14.16 o mayor

Para verificar que versión tienen instalada:

> node -v
>
> npm -v

## Tecnologías utilizadas:
- [ ] JavaScript
- [ ] React
- [ ] Redux
- [ ] Node
- [ ] Express
- [ ] Sequelize
- [ ] PostgresSQL
- [ ] HTML
- [ ] CSS

## Imagenes del proyecto

Landing Page
<img src ="https://cdn.discordapp.com/attachments/757093607768326145/999022412295311470/unknown.png?width=904&height=469"/>

Home
<img src ="https://cdn.discordapp.com/attachments/757093607768326145/999022513164124315/unknown.png?width=904&height=469"/>

Crear raza
<img src ="https://cdn.discordapp.com/attachments/757093607768326145/999022610224517200/unknown.png?width=904&height=469"/>
