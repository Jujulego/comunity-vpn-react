# Builder
FROM node:12.14.0 as builder

# Copy code
RUN mkdir /app
WORKDIR /app

# Dependencies
COPY package.json /app
COPY yarn.lock /app
RUN yarn install

# Build
COPY . /app
RUN yarn run build --prod

# Server
FROM nginx:latest

# Copy code
RUN mkdir -p /usr/share/nginx/html/community-vpn
COPY --from=builder /app/build /usr/share/nginx/html/community-vpn/
COPY nginx.conf /etc/nginx/conf.d/community-vpn.conf
