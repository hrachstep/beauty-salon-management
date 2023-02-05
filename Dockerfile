# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the remaining files to the working directory
COPY . .

# Specify the command to run when the container starts
CMD [ "yarn", "start" ]
