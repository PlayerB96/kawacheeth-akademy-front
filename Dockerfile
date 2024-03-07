# Usa una imagen base de Node.js
FROM node:14.17.2 as build
WORKDIR /usr/src/app
RUN npm install -g @angular/cli@14.2.13
COPY . .
RUN npm install
RUN npm run build
RUN ls -alt

FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /var/www/app
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

