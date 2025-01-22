# Build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN mkdir -p ./src/assets/
COPY ./src/assets/base.css ./src/assets/
COPY ./src/assets/main.css ./src/assets/
RUN npm install --omit=dev
RUN npm run tailwind-prod
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
