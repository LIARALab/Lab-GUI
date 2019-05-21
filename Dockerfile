FROM node:11 AS node
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install

FROM nginx:alpine

COPY --from=node /app /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80:80/tcp