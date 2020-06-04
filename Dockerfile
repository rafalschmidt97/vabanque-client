FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
WORKDIR /var/web
COPY --from=build /app/build .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80