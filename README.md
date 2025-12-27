<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Bata_logo.svg" alt="Bata Logo" width="200"/>
  <br/>
  <br/>

  # Bata Enterprise Replica - Full Stack E-commerce
  
  **Arquitectura Escalable | Seguridad Robusta | Automatización QA**

  [![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
  [![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

</div>

---

## 🚀 Visión General del Proyecto

**Bata Enterprise Replica** es una solución integral de comercio electrónico diseñada para simular operaciones de retail a gran escala. Este proyecto no es solo una tienda online; es una demostración de ingeniería de software avanzada que abarca desde la gestión transaccional en el Backend hasta una experiencia de usuario optimizada en el Frontend, validada mediante pipelines de automatización.

> **Nota:** Este es un proyecto académico/profesional desarrollado con fines educativos y de demostración técnica.

---

## 📸 Galería del Proyecto

| Landing Page (Home) | Detalle de Producto |
|:---:|:---:|
| <img src="./assets/demo-home.png" width="400" alt="Home Page"/> | <img src="./assets/demo-product.png" width="400" alt="Product Detail"/> |

| Panel Administrativo | Automatización QA |
|:---:|:---:|
| <img src="./assets/demo-admin.png" width="400" alt="Admin Dashboard"/> | <img src="./assets/demo-automation.png" width="400" alt="Automation Scripts"/> |

---

## 🏗️ Arquitectura del Sistema

El sistema sigue una arquitectura desacoplada (Headless Commerce approach) para garantizar la escalabilidad y mantenibilidad.

### 🔌 Backend (Spring Boot Ecosystem)
Diseñado bajo el patrón **Package by Feature** para alta cohesión.
* **Seguridad:** Implementación de `Spring Security` con **JWT (JSON Web Tokens)** y roles (Admin/User).
* **Persistencia:** `Spring Data JPA` con MySQL. Relaciones complejas (1:N, N:M) y **Cascade Deletes** para integridad referencial.
* **Manejo de Errores:** `GlobalExceptionHandler` (`@ControllerAdvice`) para respuestas HTTP estandarizadas.
* **Integraciones:**
    * `JavaMailSender`: Notificaciones SMTP transaccionales.
    * `Cloudinary API`: Gestión de assets digitales.

### 🎨 Frontend (React + TypeScript)
Estructura **Feature-based** para modularidad.
* **Estilos:** `Tailwind CSS` con diseño **Mobile-First**.
* **Estado:** Context API para gestión de carrito de compras y sesión de usuario.
* **Seguridad:** Interceptores de Axios para manejo de tokens y renovación de sesión.

---

## 🛠️ Stack Tecnológico

### Core
* **Lenguajes:** Java 21, TypeScript, SQL.
* **Frameworks:** Spring Boot 3, React 18.
* **Base de Datos:** MySQL (Relacional).

### DevOps & Tools
* **Control de Versiones:** Git & GitHub (Flujo Gitflow).
* **Contenedores:** Docker (Opcional/Futuro).
* **API Testing:** Postman / Swagger UI.
---

## 🗄️ Modelo de Base de Datos (Simplificado)

El sistema maneja una estricta integridad referencial. Ejemplo de relación crítica:

```mermaid
erDiagram
    USER ||--o| LOGIN : credentials
    USER ||--o{ ORDER : places
    PRODUCT ||--|{ VARIANT : has
    VARIANT ||--o{ ORDER_ITEM : contains
