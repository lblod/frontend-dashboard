FROM madnificent/ember:3.28.5 as builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN ember build -prod

FROM semtech/ember-proxy-service:1.5.1

ENV STATIC_FOLDERS_REGEX "^/(assets|font|files|@appuniversum)/"

COPY --from=builder /app/dist /app