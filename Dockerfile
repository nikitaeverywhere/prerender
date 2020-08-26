FROM node:10.15-alpine

# From the parent container:
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/
ENV PORT_PRERENDER=80

COPY . .

# Install
RUN apk add --update-cache chromium
RUN npm install --no-package-lock

# Cleanup
RUN rm -rf /var/cache/apk/* /tmp/*
RUN npm cache clean --force && rm -rf /usr/local/{lib/node{,/.npm,_modules},bin,share/man}/npm*

EXPOSE $PORT_PRERENDER

ENTRYPOINT ["node", "src/server.js"]
