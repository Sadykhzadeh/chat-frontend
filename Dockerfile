# mhart/alpine-node has been unmaintained for years; node:20-alpine is the
# official image on the same Alpine base.
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# The previous image was a single stage: it shipped the whole source tree and
# every devDependency, and ran as root. This carries only what `next start`
# needs. It also used `COPY ./public /var/www/app/`, which copies the contents
# of public into the app root rather than into public/.
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build --chown=node:node /app/.next ./.next
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/next.config.js ./
USER node
EXPOSE 3000
CMD ["npm", "start"]
