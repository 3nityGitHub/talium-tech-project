# ─────────────────────────────────────────────
# Stage 1: BUILD
# Uses Node 20 LTS Alpine to compile the React
# + TypeScript + Vite + Tailwind frontend into
# optimised static files in /app/dist
#
# Stage 2: SERVE
# Uses nginx Alpine to serve those static files
# The Node toolchain is discarded — never ships
# to production.
#
# Final image size: ~25MB (vs ~1GB with toolchain)
# ─────────────────────────────────────────────

FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]