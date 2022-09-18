FROM node:14 as build-stage

LABEL org.opencontainers.image.authors="GeekBrains <support@geekbrains.ru>"
USER root

ENV APPLICATION_NAME=gb-demo-app
ENV SASS_BINARY_PATH=/opt/$APPLICATION_NAME/bin/vendor/linux-x64/binding.node
WORKDIR /opt/$APPLICATION_NAME

COPY package.json package-lock.json ./
RUN npm ci

COPY ./ ./
#RUN npm run test
RUN npm run build

RUN npm prune --production

####
FROM node:12-alpine as production-stage

ENV APPLICATION_NAME=gb-demo-app
ENV NODE_ENV=production
WORKDIR /opt/$APPLICATION_NAME

COPY --from=build-stage /opt/$APPLICATION_NAME/node_modules /opt/$APPLICATION_NAME/node_modules
COPY --from=build-stage /opt/$APPLICATION_NAME/dist/ /opt/$APPLICATION_NAME/start.sh /opt/$APPLICATION_NAME/

ENV PORT 3333
EXPOSE $PORT

# Run our application
CMD ["node", "apps/api/main.js"]
