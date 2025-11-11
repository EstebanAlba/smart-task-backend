# 🚀 BACKEND SMART-TASK - Arquitectura de Microservicios

Este repositorio aloja el backend de la aplicación Smart-Task, implementado con una arquitectura de microservicios utilizando Node.js y Express. El sistema está diseñado para ser escalable, separando la lógica de negocio por servicios independientes.

---

## ⚙️ Tecnologías Clave

| Componente | Tecnología |
| :--- | :--- |
| **Lenguaje** | Node.js |
| **Framework** | Express.js |
| **Base de Datos**| MySQL |
| **Paquetes** | npm |
| **Arquitectura**| API Gateway & Microservicios |

---

## 🛠️ Configuración Inicial Obligatoria

Para poder ejecutar el sistema, **es fundamental** seguir los siguientes pasos en el orden indicado.

### 1. Requisitos Previos

* **Node.js** (Versión 18+ recomendada)
* **npm** (Incluido con Node.js)
* **Servidor MySQL** (Activo y con las bases de datos creadas: `smarttasker_auth_db` y `smarttasker_events_db`).

### 2. Instalación de Dependencias por Servicio

Debido a la arquitectura de microservicios, la instalación debe hacerse **dentro de cada carpeta de servicio** para mantener su independencia.

```bash
# Gateway
cd gateway
npm install

# Microservicios (ms-0-auth)
cd ../microservices/ms-0-auth
npm install

# Microservicios (ms-2-tasks-events)
cd ../microservices/ms-2-tasks-events
npm install

# (Repetir para cualquier otro microservicio existente...)

# Volver a la raíz
cd ../../
````

### 3\. Variables de Entorno y Configuración (`.env`)

Para cada servicio listado a continuación, el colaborador debe **CREAR un archivo llamado `.env`** dentro de la carpeta del servicio y copiar la configuración específica.

#### 🌐 Variables del API Gateway (`/gateway/.env`)

Este archivo configura el punto de entrada al sistema y cómo se comunica con los microservicios.

```env
# Puerto de ejecución del Gateway
PORT=3000

# Clave secreta (DEBE ser la misma usada en el MS-Auth)
JWT_SECRET=00d52bf27818039066568c129fc47761f774f382ed59327832c47b890e6661e7 

# URLs de los Microservicios
MS0_AUTH_URL=http://localhost:3001
MS2_TASKS_URL=http://localhost:3002
MS3_VALIDATION_URL=http://localhost:3003
```

#### 🔒 Variables del Microservicio de Autenticación (`/microservices/ms-0-auth/.env`)

Este archivo configura el servicio de autenticación y su conexión a la base de datos.

```env
# Puerto de ejecución del servicio
PORT=3001
# Clave secreta (DEBE ser la misma usada en el Gateway)
JWT_SECRET=00d52bf27818039066568c129fc47761f774f382ed59327832c47b890e6661e7

# Configuración de la Base de Datos MySQL
DB_HOST=localhost
DB_USER=root (o su usuario administrador)
DB_PASSWORD= [Contraseña del usuario de la base de datos]
DB_NAME=smarttasker_auth_db
DB_DIALECT=mysql
```

#### 📅 Variables del Microservicio de Tareas (`/microservices/ms-2-tasks-events/.env`)

Este archivo configura el servicio de tareas y su conexión a la base de datos.

```env
# Puerto de ejecución del servicio
PORT=3002

# Configuración de la Base de Datos MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= [Contraseña del usuario de la base de datos]
DB_NAME=smarttasker_events_db
DB_DIALECT=mysql
```

-----

## ▶️ Ejecución del Sistema

Una vez configuradas las variables e instaladas las dependencias, el sistema se debe iniciar en el siguiente orden:

1.  **Iniciar Microservicios** (Ejecutar en terminales separadas)

    ```bash
    cd microservices/ms-0-auth
    npm start
    # Abrir nueva terminal y repetir para ms-2-tasks-events, etc.
    ```

2.  **Iniciar el API Gateway** (Último paso, en una terminal separada)

    ```bash
    cd gateway
    npm start
    ```

-----

Este `README.md` es **explícito** y utiliza toda la información precisa que me proporcionaste. ¿Te gustaría ahora que te ayude con el borrador del `README.md` para el **Frontend**?