# Installations required:
# - node (v20-alpine)
# - npm (comes with node)
# - serve (for static file serving)

# Stage 1: Build the React app
FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the build with a static server
FROM node:20-alpine as production
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"] 