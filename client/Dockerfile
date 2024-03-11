FROM node

# Create a user named 'app'
RUN useradd -m app

# Set the user to run the app
USER app

WORKDIR /client/src

COPY package.json package.json
COPY package-lock.json package-lock.json

# RUN npm install

COPY . .

ENTRYPOINT [ "node", "main.jsx" ]
