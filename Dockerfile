 Use a lightweight base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
COPY src ./src

# Install dependencies and clean npm's cache
RUN npm install --production --ignore-scripts && \
    npm cache clean --force && \
    npm install -g typescript && \
    npm install --save-dev @types/express && \
    tsc -p .

# Expose the port that the application runs on
EXPOSE 3000

# Define a health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/health || exit 1

# Start the application
CMD [ "npm", "start" ]
