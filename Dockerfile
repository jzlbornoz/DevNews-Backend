# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json./

# Install dependencies
RUN npm install

# Copy the rest of your application files to the container
COPY..

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["npm", "start"]