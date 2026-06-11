# =============================================================================
# Dockerfile — Imagen de producción para la práctica NestJS
# =============================================================================
# Build multi-etapa: se compila en "builder" y se ejecuta una imagen liviana
# en "runner" con solo las dependencias de producción.
# =============================================================================

# --- Etapa 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependencias de forma reproducible (usa package-lock.json).
COPY package.json package-lock.json ./
RUN npm ci

# Copia el resto del código y compila a la carpeta dist/
COPY . .
RUN npm run build

# --- Etapa 2: Runner (producción) ---
FROM node:20-alpine AS runner

WORKDIR /app

# Entorno de ejecución en modo producción.
ENV NODE_ENV=production

# Instala SOLO las dependencias de producción (sin devDependencies).
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copia los artefactos compilados desde la etapa de build.
COPY --from=builder /app/dist ./dist

# Arranca el punto de entrada compilado de NestJS.
CMD ["node", "dist/main.js"]

# Puerto por defecto
EXPOSE 8080
