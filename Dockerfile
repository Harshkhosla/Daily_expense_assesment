# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your app will run on
EXPOSE 5000

# Command to start the application
CMD ["npm", "start"]
