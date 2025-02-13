# Use the official Node.js image.
FROM node:16

# Set the working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the entire project.
COPY . .

# Expose the port your app is running on.
EXPOSE 3000

# Command to run the app.
CMD ["npm", "run", "start:dev"]
