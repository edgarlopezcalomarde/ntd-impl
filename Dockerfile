FROM node:21-bookworm-slim
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3120
CMD npm run build:start