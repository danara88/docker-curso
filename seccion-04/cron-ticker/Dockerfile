# alpine tiene carpetas como: /app /usr /lib /bin etc
# FROM node:19.2-alpine
# FROM --platform=linux/amd64 node:19.2-alpine
FROM --platform=$BUILDPLATFORM node:19.2-alpine

# cd app
WORKDIR /app

# Copiar los archivos que hace mi aplicacion
# Destion -> /app
# Si ha cambios en el app, se va a ejecutar esa capa. Si no, se mantiene en cache
COPY package.json ./

# Reconstruir los modulos de node
RUN npm install

# Copiar todos los archivos de este path  y pegarlos en el destino.
# Excluyendo todos lo que se encuentra en el dockerignore.
# Cuidado! Estas copiando los módulos de node en el ./app
COPY . .

# Correr los tests
RUN npm run test

# Una vez el testing pasa, eliminar archivos y directorios no necesarios en producción
RUN rm -rf tests && rm -rf node_modules

# Instalar las dependencias para producción
RUN npm install --prod

# Comadno que se ejecuta cuando se hace el run de la imagen
# Especifica la instrucción que se ejecutará cuando se inicie un contenedor Docker.
# Este se va a ejecutar cuando se monte la imagen en un contenedor
CMD ["node", "app.js"]



