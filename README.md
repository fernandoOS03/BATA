<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Bata_logo.svg" alt="Bata Logo" width="180"/>
  <br/>
  <h1>👟 Bata Enterprise Replica</h1>
  <h3>Full Stack E-commerce Solution</h3>

  <p>
    <b>Arquitectura Escalable</b> • <b>Seguridad JWT</b> • <b>Automatización QA</b> • <b>Headless Commerce</b>
  </p>

  <p>
    <a href="https://www.java.com/">
      <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java"/>
    </a>
    <a href="https://spring.io/projects/spring-boot">
      <img src="https://img.shields.io/badge/Spring_Boot-3.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot"/>
    </a>
    <a href="https://reactjs.org/">
      <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
    </a>
    <a href="https://www.mysql.com/">
      <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
    </a>
  </p>
</div>

<br/>

> **🚧 Nota:** Este proyecto es una simulación académica/profesional diseñada para demostrar competencias avanzadas en ingeniería de software, replicando la lógica de negocio de un retail a gran escala.

---

## 📑 Tabla de Contenidos
1. [🚀 Visión General](#-visión-general)
2. [📸 Galería de la Aplicación](#-galería-de-la-aplicación)
3. [🏗️ Arquitectura del Sistema](#-arquitectura-del-sistema)
4. [🛠️ Stack Tecnológico](#-stack-tecnológico)
5. [🗄️ Modelo de Datos](#-modelo-de-datos)

---

## 🚀 Visión General

**Bata Enterprise Replica** no es solo una tienda online; es una orquestación de servicios diseñada para alta disponibilidad. El sistema resuelve problemas complejos como la concurrencia en inventarios, la seguridad en transacciones y la gestión de roles granulares.

### Key Features
* 🔐 **Seguridad Bancaria:** Autenticación robusta vía Spring Security + JWT.
* 🛒 **Gestión de Estado Compleja:** Manejo de carritos y sesiones con Context API y persistencia optimizada.
* ⚡ **Rendimiento:** Backend optimizado con Spring Data JPA y Frontend con carga perezosa (Lazy Loading).
* 📱 **Responsive Design:** Interfaz "Mobile-First" construida con Tailwind CSS.

---

## 📸 Galería de la Aplicación

<details>
<summary><b>🔐 Autenticación & Perfil (Click para ver)</b></summary>
<br>

| Landing Page | Login |
|:---:|:---:|
| <img src="./assets/home-page.png" width="400" alt="Landing"/> | <img src="./assets/login.png" width="400" alt="Login"/> |

| Registro de Usuario | Perfil |
|:---:|:---:|
| <img src="./assets/register.png" width="400" alt="Register"/> | <img src="./assets/user-profile.png" width="400" alt="Profile"/> |
</details>

<details>
<summary><b>🛒 Experiencia de Compra (Click para ver)</b></summary>
<br>

| Catálogo | Detalle de Producto |
|:---:|:---:|
| <img src="./assets/product-list-user.png" width="400" alt="List"/> | <img src="./assets/products-detail-user.png" width="400" alt="Detail"/> |

| Carrito | Checkout / Detalle |
|:---:|:---:|
| <img src="./assets/cart.png" width="400" alt="Cart"/> | <img src="./assets/cart-detail-user.png" width="400" alt="Detail Cart"/> |
</details>

<details>
<summary><b>🛠️ Panel Administrativo (Click para ver)</b></summary>
<br>

| Dashboard General | Gestión de Productos |
|:---:|:---:|
| <img src="./assets/dashboard-admin.png" width="400" alt="Admin"/> | <img src="./assets/create-product.png" width="400" alt="Create"/> |
| **Edición de Inventario** | **Base de Datos** |
| <img src="./assets/edit-product.png" width="400" alt="Edit"/> | <img src="./assets/database.png" width="400" alt="DB"/> |
</details>

---

## 🏗️ Arquitectura del Sistema

El sistema sigue un enfoque **Headless Commerce**, desacoplando totalmente el Frontend del Backend.

### 🔌 Backend (Spring Boot Ecosystem)
> Arquitectura limpia basada en **Package by Feature**.

* `Security`: Filtros personalizados de **Spring Security** para intercepción de JWT.
* `Persistencia`: **Spring Data JPA** optimizado con relaciones Lazy/Eager según el contexto.
* `Error Handling`: `@ControllerAdvice` para devolver JSONs de error estandarizados (RFC 7807).
* `Integraciones`:
    * 📨 **JavaMailSender**: Para confirmaciones de compra.
    * ☁️ **Cloudinary API**: Almacenamiento CDN para imágenes de productos.

### 🎨 Frontend (React + TypeScript)
> Modularidad a través de **Atomic Design** simplificado.

* `Hooks Personalizados`: Para lógica reutilizable de consumo de API.
* `Axios Interceptors`: Inyección automática de tokens y manejo de errores 401/403.
* `Zustand / Context`: Gestión de estado global ligero.

---

## 🛠️ Stack Tecnológico

| Área | Tecnologías Clave |
| :--- | :--- |
| **Backend** | ![Java](https://img.shields.io/badge/-Java%2021-ED8B00?logo=openjdk&logoColor=white) ![Spring Boot](https://img.shields.io/badge/-Spring%20Boot-6DB33F?logo=spring-boot&logoColor=white) ![Maven](https://img.shields.io/badge/-Maven-C71A36?logo=apache-maven&logoColor=white) |
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/-Tailwind-06B6D4?logo=tailwindcss&logoColor=white) |
| **Data** | ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white) ![Hibernate](https://img.shields.io/badge/-Hibernate-59666C?logo=hibernate&logoColor=white) |
| **DevOps** | ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white) ![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white) ![Postman](https://img.shields.io/badge/-Postman-FF6C37?logo=postman&logoColor=white) |

---

## 🗄️ Diagrama Entidad-Relación

A continuación se muestra una versión simplificada de la lógica de negocio usando **Mermaid.js**.

```mermaid
erDiagram
    USER ||--o| LOGIN : "tiene credenciales"
    USER ||--o{ ORDER : "realiza"
    ORDER ||--|{ ORDER_ITEM : "contiene"
    PRODUCT ||--|{ VARIANT : "tiene variaciones"
    VARIANT ||--o{ ORDER_ITEM : "es parte de"
    
    USER {
        string email
        string role
    }
    ORDER {
        date created_at
        float total
        enum status
    }
    PRODUCT {
        string sku
        string name
    }