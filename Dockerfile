ARG IMAGE=node:lts-alpine

FROM $IMAGE as base_image
WORKDIR /usr/src/app
COPY . .
ARG NX_NON_NATIVE_HASHER=true
RUN npm ci

# DEVELOPMENT
FROM base_image as dev
CMD [""]

# STAGING
FROM base_image as staging_client
RUN npm run build:client

FROM nginx:alpine as staging
COPY --from=staging_client /usr/src/app/docs /usr/share/nginx/html
EXPOSE 80


