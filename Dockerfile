ARG IMAGE=node:18.15-alpine

FROM $IMAGE as base_image
WORKDIR /usr/src/app
COPY . .
RUN npm ci

# DEVELOPMENT
FROM base_image as dev
CMD [""]

# STAGING
FROM base_image as staging_build
RUN npm run build:client

FROM nginx:alpine as staging
COPY --from=staging_build /usr/src/app/docs /usr/share/nginx/html
EXPOSE 80
