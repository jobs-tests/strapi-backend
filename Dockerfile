# First build stage
FROM bitnami/node:12 as builder

# Copy app's source code to the /app directory
COPY . /app

# The application's directory will be the working directory
WORKDIR /app

# Install Node.js dependencies defined in '/app/packages.json'
RUN npm install

# Build nodejs
RUN npm run build

# Run Database Migration
RUN npm run db:migrate

# Run Database Seed
RUN npm run db:seed

# Second build stage
FROM bitnami/node:12-prod
ENV NODE_ENV="production"

# Copy the application code
COPY --from=builder /app /app

# Create a non-root user
RUN useradd -r -u 1001 -g root nonroot
RUN chown -R nonroot /app
USER nonroot

EXPOSE 3000

# Start the application
CMD ["npm", "start"]
