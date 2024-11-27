# Etapa 1: Instalar dependencias (de produccion y de desarrollo)
FROM --platform=$BUILDPLATFORM node:19.2-alpine3.16 as deps
WORKDIR /app
COPY package.json ./
RUN npm install

# Etapa 2: Instalar dependencias (de produccion)
FROM --platform=$BUILDPLATFORM node:19.2-alpine3.16 as prod-deps
WORKDIR /app
COPY package.json ./
RUN npm install --prod

# Etapa 3: Probar la aplicacion
FROM --platform=$BUILDPLATFORM node:19.2-alpine3.16 as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Copia todo lo que no esta en el dockerignore
COPY . .
RUN npm run test

# Etapa 4: Ejecutar la app
FROM --platform=$BUILDPLATFORM node:19.2-alpine3.16 as runner
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY app.js .
# COPY al no copia directorios, por lo que tenemos que 
# expecificar el directorio exacto en el filesystem de la imagen.
# Aqui copia todo el contenido dentro de /tasks y lo va a pegar
# todo el contenido en un directorio llamado /tasks
COPY tasks/ ./tasks
CMD ["node", "app.js"]



