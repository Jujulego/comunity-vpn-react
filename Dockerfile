# Builder
FROM node:12.14.0 as builder

# Copy code
RUN mkdir /app
WORKDIR /app

# Dependencies
COPY package.json /app
RUN npm install

# Build
COPY . /app
RUN npm run build -- --prod

# Server
FROM nginx:latest

# Copy code
RUN mkdir -p /usr/share/nginx/html/community-vpn
COPY --from=builder /app/build /usr/share/nginx/html/community-vpn/
COPY nginx.conf /etc/nginx/conf.d/community-vpn.conf
