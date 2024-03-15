FROM node:16 AS build_stage
WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://192.168.1.9:3001
RUN npm ci
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=build_stage /usr/src/app/build /usr/share/nginx/html