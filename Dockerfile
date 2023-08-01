ARG IMAGE=node:lts-alpine

FROM $IMAGE as base_image
WORKDIR /usr/src/app
COPY package*.json .
ARG NX_NON_NATIVE_HASHER=true
RUN npm ci

# DEVELOPMENT
FROM base_image as dev
COPY . .
CMD [""]

# STAGING
FROM dev as staging_build_client
RUN npm run build:client

FROM dev as staging_build_server
RUN npm run build:signal

FROM nginx:alpine as staging_client
COPY --from=staging_build_client /usr/src/app/docs /usr/share/nginx/html
EXPOSE 80

FROM staging_build_server as staging_server
CMD ["node", "./dist/packages/signal/main.js"]
EXPOSE 3000 9000

