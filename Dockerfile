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
ENV ZIP_SOCKET_SERVER=https://socket.fartyparts.work
ENV ZIP_SOCKET_PORT=443
ENV ZIP_PEER_SERVER=peer.fartyparts.work
ENV ZIP_PEER_PORT=443
ENV ZIP_STUN_SERVER=stun.fartyparts.work
ENV ZIP_TURN_SERVER=turn.fartyparts.work
RUN npm run build:client

FROM dev as staging_build_server
ENV ALLOWED_ORIGINS=https://fartyparts.work
RUN npm run build:signal

FROM nginx:alpine as staging_client
COPY --from=staging_build_client /usr/src/app/docs /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443

FROM staging_build_server as staging_server
CMD ["node", "./dist/packages/signal/main.js"]
EXPOSE 3000 9000

FROM dev as prod_build_client
ENV ZIP_SOCKET_SERVER=https://socket.zipcaptions.app
ENV ZIP_SOCKET_PORT=443
ENV ZIP_PEER_SERVER=peer.zipcaptions.app
ENV ZIP_PEER_PORT=443
ENV ZIP_STUN_SERVER=stun.zipcaptions.app
ENV ZIP_TURN_SERVER=turn.zipcaptions.app
RUN npm run build:client

FROM nginx:alpine as prod_client
COPY --from=staging_build_client /usr/src/app/docs /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

FROM dev as prod_build_server
ENV ALLOWED_ORIGINS=https://zipcaptions.app
RUN npm run build:signal

FROM staging_build_server as prod_server
CMD ["node", "./dist/packages/signal/main.js"]
EXPOSE 3000 9000