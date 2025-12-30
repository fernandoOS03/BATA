<div align="center">
  <img src="https://cdn.worldvectorlogo.com/logos/bata-4.svg" alt="Bata Logo" width="200"/>
  <br/><br/>

  # Bata Enterprise Replica – Full Stack E-commerce
  
  **Arquitectura Escalable | Seguridad Robusta | Automatización QA**

  [![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
  [![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
</div>

---

## 🚀 Visión General del Proyecto

**Bata Enterprise Replica** es una solución integral de comercio electrónico diseñada para simular operaciones de retail a gran escala.  
El proyecto demuestra ingeniería de software aplicada de extremo a extremo: backend transaccional seguro, frontend moderno y automatización de calidad.

> **Nota:** Proyecto académico/profesional con fines educativos y demostrativos.

---

## 📸 Galería del Proyecto

### 🏠 Landing & Autenticación
| Landing Page | Login |
|:---:|:---:|
| <img src="./assets/home-page.png" width="380" alt="Landing Page"/> | <img src="./assets/login.png" width="380" alt="Login"/> |

| Registro | Perfil de Usuario |
|:---:|:---:|
| <img src="./assets/register.png" width="380" alt="Register"/> | <img src="./assets/user-profile.png" width="380" alt="User Profile"/> |

---

### 🛒 Experiencia de Usuario (E-commerce)
| Lista de Productos | Detalle de Producto |
|:---:|:---:|
| <img src="./assets/product-list-user.png" width="380" alt="Product List"/> | <img src="./assets/products-detail-user.png" width="380" alt="Product Detail"/> |

| Carrito | Detalle del Carrito |
|:---:|:---:|
| <img src="./assets/cart.png" width="380" alt="Cart"/> | <img src="./assets/cart-detail-user.png" width="380" alt="Cart Detail"/> |

| Página 404 | — |
|:---:|:---:|
| <img src="./assets/404.png" width="380" alt="404 Page"/> | — |

---

### 🛠️ Panel Administrativo
| Dashboard | Gestión de Productos |
|:---:|:---:|
| <img src="./assets/dashboard-admin.png" width="380" alt="Admin Dashboard"/> | <img src="./assets/create-product.png" width="380" alt="Create Product"/> |

| Edición de Producto | — |
|:---:|:---:|
| <img src="./assets/edit-product.png" width="380" alt="Edit Product"/> | — |

---

### 🗄️ Base de Datos
| Modelo de Datos |
|:---:|
| <img src="./assets/database.png" width="380" alt="Database Model"/> |

---

## 🏗️ Arquitectura del Sistema

Arquitectura desacoplada (**Headless Commerce**) orientada a escalabilidad y mantenibilidad.

### 🔌 Backend (Spring Boot)
- **Seguridad:** Spring Security + JWT + Roles
- **Persistencia:** Spring Data JPA + MySQL
- **Errores:** `@ControllerAdvice`
- **Integraciones:** JavaMailSender, Cloudinary

### 🎨 Frontend (React + TypeScript)
- **Arquitectura:** Feature-based
- **UI:** Tailwind CSS (Mobile-First)
- **Estado:** Context API
- **Seguridad:** Axios Interceptors

---

## 🛠️ Stack Tecnológico

### Core
- Java 21, TypeScript, SQL
- Spring Boot 3, React 18
- MySQL

### DevOps & Tools
- Git & GitHub (Gitflow)
- Docker (Roadmap)
- Postman / Swagger

---

## 🗄️ Modelo de Base de Datos (Simplificado)

```mermaid
erDiagram
    USER ||--o| LOGIN : credentials
    USER ||--o{ ORDER : places
    PRODUCT ||--|{ VARIANT : has
    VARIANT ||--o{ ORDER_ITEM : contains
