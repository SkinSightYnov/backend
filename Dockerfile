#
# 🧑‍💻 Development
#
FROM node:18-alpine as dev
# add the missing shared libraries from alpine base image
RUN apk add --no-cache libc6-compat
# Create app folder
WORKDIR /app

# Set to dev environment
ENV NODE_ENV dev
# Set the Timezone
ENV TZ=Europe/Paris

# Copy source code into app folder
COPY --chown=node:node . .

# Install dependencies
RUN npm i
# Generate the prisma client
RUN npx prisma generate

# Set Docker as a non-root user
USER node

#
# 🏡 Production Build
#
FROM node:18-alpine as build

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV production
# Set the Timezone
ENV TZ=Europe/Paris


# In order to run the Nest CLI, we need to install the dev dependencies.
# Nest CLI is a dev dependency.
COPY --chown=node:node --from=dev /app/node_modules ./node_modules
# Copy source code
COPY --chown=node:node . .

# Run the prisma generate
RUN npx prisma generate

# Generate the production build. The build script runs "nest build" to compile the application.
RUN npm run build

# Install only the production dependencies and clean cache to optimize image size.
RUN npm i --only=production && npm cache clean --force

# Set Docker as a non-root user
USER node

#
# 🚀 Production Server
#
FROM node:18-alpine as prod

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV production
# Set the Timezone
ENV TZ=Europe/Paris

# Install PM2
RUN npm install -g pm2

# Copy only the necessary files
COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules
# Copy the prisma folder (schema + migrations)
COPY --chown=node:node --from=build /app/prisma prisma

# Set Docker as non-root user
USER node

# Execute prisma migration and Run the app with PM2
CMD ["npx", "prisma", "migrate", "deploy", "--preview-feature", "--schema", "prisma/schema.prisma", "&&", "pm2", "start", "dist/main.js", "-name", "nest-app", "--no-daemon"]
