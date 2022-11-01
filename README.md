# pasos para configurar el ambiente de desarrollo (virtual docker)
<p>configurar el archivo .env (variables de entorno) podía copiar el archivo .env.example, este archivo se utilizar para las variables de entorno de docker</p>
<spna>comandos para ambiente linux</span>
```bash
    cp .env.example .env
```
<span>comando para ambiente windows </span>
```bash
    copy .env.example .env
```
<ul>
    <li>NODE_PORT: puerto en el cual se ejecutará node jsli>
    <li>MYSQL_PORT: puerto de mysql</li>
    <li>MYSQL_PASSWORD: contraseña para el usuario root</li>
    <li>MYSQL_DATABASE: nombre de la base de datos (fintech)</li>
    <li>MYSQL_VOLUMES: ubicación física del respaldo de docker</li>
    <li>PROJECT_NAME: nombre del contenedor (fintech)</li>
</ul>

<p>Una vez configuradas las variables de entorno, se procede a levantar el ambiente (Tomar en cuenta tener previamente instalado y configurado docker)</p>
<a href='https://docs.docker.com/engine/install/ubuntu/' target='_blank'><strong>Install Docker: </strong></a>

```bash 
    docker compose up -d
```
# pasos para configurar backend (local)
<p>se debe de configurar un archivo .env, puede tomar de ejemplo el archiv .env.example, <strong>(los puertos deben de considir con los configurados en el archivo .env para el docker del anterior paso)</strong></p>
<spna>comandos para ambiente linux</span>
```bash
    cd ./api && cp .env.example .env
```
<span>comando para ambiente windows</span>
```bash
    cd .\api && copy .env.example .env
```
<ul>
    <li>PORT: puerdo en el cual se ejecuta el node js (si se levanta con docker colocar 4000 ya que ese es el expueto y el docker tiene el configurado el puerto expuesto en el host ejemplo 80:4000)</li>
    <li>NODE_ENV: este puede ser "production"/"development" dependiendo del entorno que desee ejecutar</li>
    <li>DB_HOST: configuracion de host de mysql</li>
    <li>DB_USER: usuario de la base de datos</li>
    <li>DB_PASSWORD: contraseña de la base de datos</li>
    <li>DB_NAME: nombre de la base de datos</li>
    <li>DB_PORT: pueto de la base de datos (3306)</li>    
    <li>SESSION: id único (uuid) que permite el almacenamiento en localstore la sesion del usuario</li>
    <li>SECRET: id único que permite el cifrado de datos de extremo a extremo</li>
    <li>IV: id único que permite el cifrado de datos de extremo a extremo</li>
    <li>ENCODING: id único que permite realizar pruebas en ambiente local sin cifrar informacion</li>
    <li>TOKEN: id único que permite almacenar en local store para rutas privadas</li>
</ul>

<p>una ves configurado las variables de entorno procedemos con los siguientes comandos </strong>(si es local)</strong></p>
```bash
    npm i && npm run dev
```

# pasos para configurar frontend 
<p>se debe de configurar un archivo .env, puede tomar de ejemplo el archiv .env.example <strong>(Tomar en cuenta que los id deben ser los mismo que el del backend)</strong></p>
<spna>comandos para ambiente linux</span>
```bash
    cd ./web && cp .env.example .env
```
<span>comando para ambiente windows</span>
```bash
    cd .\web && copy .env.example .env
```

<ul>
    <li>VERSION_API: versión actual del backend<li>
    <li>REACT_APP_NODE_PORT: puerto en el cual se está ejecutando node</li>
    <li>REACT_APP_NODE_HOST: dominio en el cual se está ejecutando node (localhost)</li>
    <li>SESSION: id único (uuid) que permite el almacenamiento en localstore la sesion del usuario</li>
    <li>SECRET: id único que permite el cifrado de datos de extremo a extremo</li>
    <li>IV: id único que permite el cifrado de datos de extremo a extremo</li>
    <li>ENCODING: id único que permite realizar pruebas en ambiente local sin cifrar informacion</li>
    <li>TOKEN: id único que permite almacenar en local store para rutas privadas</li>
    <li>FBID: id de Facebook dev para autentificación</li>
    <li>GOOGLEID: id de Google cloud para autentificación</li>
</ul>

<a href='https://developers.facebook.com/docs/facebook-login/' target='_blank'> <strong>Inicio de sesión con Facebook</strong></a>
<a href='https://cloud.google.com/docs/authentication/api-keys?hl=es-419' target='_blank'> <strong>Autentica con claves de API (google cloud)</strong></a>

<p>una ves configurado las variables de entorno procedemos con los siguientes comandos</p>
```bash 
    bash npm i --legacy-peer-deps && npm run dev
```
