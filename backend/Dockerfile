FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/

RUN npm ci --omit=dev --workspaces --include-workspace-root=false

COPY shared/dist ./shared/dist
COPY backend/dist ./backend/dist

WORKDIR /app/backend

EXPOSE 7183

CMD ["npm", "start"]