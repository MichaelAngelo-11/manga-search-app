# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json separately for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project files
COPY . .

# Expose the app on port 8080
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
