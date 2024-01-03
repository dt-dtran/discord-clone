# Start (Block 1) Dependency Solving Stage
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    else echo "Lock file not found." && exit 1; \
    fi

# End (Block 1)

# Start (Block 2) Build the Application Stage

FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# End (Block 2)

# Start (Block 3) Create the Application Runner
FROM node:18-alpine AS runner
WORKDIR /app

# Declare the NODE_ENV
ENV NODE_ENV production

# Add the Group and User to Container
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the next js application form builder image
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
# Expose the Application Port
EXPOSE 443
# Add the Environment Port Variable
ENV PORT 443

# Run the Application with "server.js" using node, which is
# Auto Generated by Standalone mode
CMD ["node", "server.js"]
# End (Block 3)
