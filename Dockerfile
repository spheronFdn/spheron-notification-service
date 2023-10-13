# Use Node.js base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose the port on which the server will listen
EXPOSE 8111

# Start the server
CMD [ "npm", "start" ]