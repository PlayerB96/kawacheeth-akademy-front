# Usa una imagen base de Node.js
FROM node:14.17.2 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli@14.2.13

# Copia los archivos de la aplicación al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Construye la aplicación
RUN ng build

RUN ls -alt

FROM nginx:1.17.1-alpine

COPY --from=build /app/dist/your-project-name/ /usr/share/nginx/html

EXPOSE 80

