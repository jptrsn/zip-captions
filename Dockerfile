ARG IMAGE=node:18.15-alpine

FROM $IMAGE as base_image
WORKDIR /usr/src/app
COPY . .
RUN npm ci

# DEVELOPMENT
FROM base_image as dev
CMD [""]