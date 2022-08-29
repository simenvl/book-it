# stage one: where we build the application
FROM node:16 as build

WORKDIR /app

COPY [".npmrc", "package.json", "package-lock.json", "./"]
COPY prisma ./prisma/

RUN npm ci --ignore-scripts
RUN npx prisma generate

COPY . .
RUN npm run build

## stage two: where the app actually runs
FROM node:lts-alpine@sha256:2f50f4a428f8b5280817c9d4d896dbee03f072e93f4e0c70b90cc84bd1fcfe0d

WORKDIR /app

ENV NODE_ENV=production

COPY ["package.json", "package-lock.json", "./"]
COPY prisma ./prisma/

RUN npm ci --only=production --ignore-scripts
RUN npx prisma generate

RUN rm .npmrc #remove npmrc to avoid token leakage

COPY --chown=node:node --from=build /app/dist .

EXPOSE 3000
USER node
CMD ["node", "src/index.js"]
