ARG IMAGE=node:lts-alpine

FROM $IMAGE as base_image
WORKDIR /usr/src/app
COPY package*.json .
ARG NX_NON_NATIVE_HASHER=true
RUN npm ci --ignore-scripts

# DEVELOPMENT
FROM base_image as dev
COPY . .
CMD [""]

# STAGING
FROM dev as staging_build_client
ENV ZIP_SOCKET_SERVER=wss://next-api.zipcaptions.app
ENV ZIP_PEER_SERVER=https://next-api.zipcaptions.app
ENV ZIP_PEER_PORT=3000
ENV ZIP_AUTH_API_URL=https://next-api.zipcaptions.app
ENV ZIP_AUTH_API_VERSION=v1
RUN npm run build:client:staging

FROM dev as staging_build_signal
RUN npm run build:signal

FROM dev as staging_build_server
RUN npm run build:server

FROM nginx:alpine as staging_client
COPY --from=staging_build_client /usr/src/app/docs /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443

FROM staging_build_signal as staging_signal
CMD ["node", "./dist/packages/signal/main.js"]
EXPOSE 3000 9000

FROM staging_build_server as staging_server
CMD ["node", "./dist/packages/server/main.js"]
EXPOSE 3000 9000

FROM dev as prod_build_client
ENV ZIP_SOCKET_SERVER=https://socket.zipcaptions.app
ENV ZIP_SOCKET_PORT=443
ENV ZIP_PEER_SERVER=peer.zipcaptions.app
ENV ZIP_PEER_PORT=443
RUN npm run build:client

FROM nginx:alpine as prod_client
COPY --from=staging_build_client /usr/src/app/docs /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

FROM dev as prod_build_signal
RUN npm run build:signal

FROM staging_build_signal as prod_signal
CMD ["node", "./dist/packages/signal/main.js"]
EXPOSE 3000 9000

FROM dev as prod_build_server
RUN npm run build:server

FROM prod_build_server as prod_server
CMD ["node", "./dist/packages/server/main.js"]
EXPOSE 3000