# Cyber-Banca - Examen Sumativo 2

**Estudiante:** Constanza
**Módulo:** Taller de Plataformas Web (AIEP)

Sistema de banca en línea desarrollado con React, Node.js y Supabase.

---

## 🛠️ Stack Tecnológico

- **Backend:** Node.js / Express (Arquitectura MVC).
- **Frontend:** React.js.
- **Mobile:** React Native (Consulta de saldo).
- **Seguridad:** JWT y HTTPS vía Vercel (Certificados Let's Encrypt).
- **Documentación:** Swagger UI (OpenAPI 3.0).
- **Base de Datos:** Supabase (PostgreSQL).

---

## 📋 Estructura del Repositorio

- **📂 backend/**: Servidor Express, controladores, rutas y middlewares de seguridad.
- **📂 frontend/**: Aplicación Web en React con Vite.
- **📂 mobile/**: Aplicación Móvil en React Native para consulta de saldo.
- **📂 docs/**: Documentación técnica e informes del proyecto.

---

## 🚀 Requerimientos de la Rúbrica

### 1. Backend y Seguridad (AE 1)
- Implementación de **Arquitectura MVC** para una separación de responsabilidades limpia.
- Control de sesiones mediante **JWT (JSON Web Tokens)**.
- Documentación de todos los endpoints mediante **Swagger** disponible en `/api-docs`.

### 2. Infraestructura y SSL (AE 2)
- Despliegue en **Vercel** con sincronización GitHub (CI/CD).
- Habilitación de **HTTPS** automático mediante certificados de terceros (Let's Encrypt).

### 3. Funcionalidades Bancarias (AE 3)
- Gestión de usuarios con roles diferenciados.
- Visualización de saldo y movimientos.
- Módulo de transferencias internas e interbancarias (Banco Aerum).

---

## 🔐 Credenciales de Prueba (Demo)
- **Usuario Cliente:** `connita1800@gmail.com` | **Pass:** `123456`
- **Usuario Administrador:** `admin@cyberbanca.cl` | **Pass:** `admin123`

---

## 👩‍💻 Desarrollado por
**Constanza** - Proyecto Final Taller de Plataformas Web (AIEP 2026).
