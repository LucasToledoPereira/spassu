FROM node:lts-alpine as build
WORKDIR /app
COPY . ./
RUN npm ci
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
CMD ["npm", "run", "start:prod"]
