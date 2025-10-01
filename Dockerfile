# Usar la imagen oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar el código fuente de la aplicación
COPY . .

# Exponer el puerto 5500
EXPOSE 5500

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
