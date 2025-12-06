FROM node:22 AS builder

WORKDIR /app

# Copy package files from ktech_hackathon directory
COPY ktech_hackathon/package.json ktech_hackathon/package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy all source files from ktech_hackathon directory
COPY ktech_hackathon/ ./

# Build the Next.js application
RUN npm run build

# Production image
FROM node:22 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy public folder
COPY --from=builder /app/public ./public

# Copy standalone output (includes server)
COPY --from=builder /app/.next/standalone ./

# Copy static files INTO the standalone .next folder
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Use node to run the standalone server
CMD ["node", "server.js"]

