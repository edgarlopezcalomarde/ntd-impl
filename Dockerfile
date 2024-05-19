FROM node:21-bookworm-slim
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 4000
CMD npm run build:start