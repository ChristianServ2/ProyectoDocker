# Usamos Nginx como servidor web
FROM nginx:alpine

# Copiamos los archivos estáticos (HTML, JS, assets) al directorio que sirve Nginx
COPY . /usr/share/nginx/html

# Exponemos el puerto 80 dentro del contenedor
EXPOSE 80
