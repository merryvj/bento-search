FROM ghcr.io/puppeteer/puppeteer:19.11.1
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
CMD ["node", "./dist/server.js"]