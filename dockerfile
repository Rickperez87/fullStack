FROM node:12.17.0
WORKDIR /usr/src/purgo-server
COPY ./ ./
RUN npm install
CMD ["/bin/bash"]