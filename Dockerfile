# Usa la imagen oficial de Node.js como base
FROM node:14.11.1 AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package.json package-lock.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el código fuente del proyecto
COPY . .

# Compila la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:1.21.5

# Copia los archivos estáticos compilados del paso de construcción anterior al contenedor Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configura el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para que la aplicación Angular sea accesible
EXPOSE 80

# Comando de inicio de Nginx
CMD ["nginx", "-g", "daemon off;"]
