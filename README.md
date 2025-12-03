# Sistema IoT Industrial

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Node-RED](https://img.shields.io/badge/Node--RED-8F0000?style=for-the-badge&logo=nodered&logoColor=white)
![GitHub top language](https://img.shields.io/github/languages/top/OmarRMC/sistema-iot-industrial?style=for-the-badge)
[![Desplegado en Vercel](https://vercel.com/button)](https://sistema-iot-industrial.vercel.app)

## 📝 Descripción del Proyecto

Este repositorio contiene el código fuente para el **frontend y el servidor web** de un **Sistema de Monitoreo, Control y Gestión para Internet de las Cosas (IoT) aplicado a entornos industriales**.

El proyecto implementa una **arquitectura completa de IoT industrial** con el siguiente flujo de datos:

1.  **Captura de Datos:** Los sensores industriales están conectados a un **PLC (Controlador Lógico Programable)**, que actúa como el punto de adquisición de datos en la planta.
2.  **Procesamiento Edge/Middleware:** La data capturada por el PLC es gestionada y pre-procesada por **Node-RED**. Esta herramienta es fundamental para la lógica de integración y envío de datos.
3.  **Almacenamiento en Nube:** Node-RED se conecta y utiliza **Firebase Realtime Database** para almacenar la información de los sensores de manera eficiente y en tiempo real.
4.  **Visualización y Control:** El servidor **Node.js/Express** se conecta a Firebase para recuperar los datos y renderizar el **Panel de Monitoreo (EJS)**, permitiendo la visualización en tiempo real y el control operativo directo (Iniciar/Detener el sistema).

El objetivo es ofrecer una herramienta robusta que centralice la supervisión de variables críticas como la **Temperatura y el pH**, y gestione estados de sensores específicos.

---

## ✨ Características Principales

El sistema está organizado en una interfaz de usuario con un menú de navegación claro (`Inicio`, `Historial`, `Usuarios`, `Perfil`, etc.) y ofrece las siguientes funcionalidades clave, basándose en los datos recibidos de Firebase:

1.  **Panel de Monitoreo Central (`Inicio`):**
    * **Control Operativo:** Permite iniciar y detener el sistema con botones dedicados.
    * **Supervisión de Sensores:** Muestra el estado en tiempo real de variables críticas como la **Temperatura**, el **pH**, el **Estado del sensor capacitivo** y los estados de los **Sensores de Nivel (Bajo y Alto)**.
    * **Estado General:** Proporciona una vista rápida del estado general del sistema.

2.  **Gráficas y Reportes en Tiempo Real (`Historial`):**
    * **Visualización Dinámica:** Muestra **Gráficas en Tiempo Real** (basadas en datos de Firebase) de las principales variables, incluyendo la **Temperatura** y el **pH**.
    * **Generación de Reportes:** Ofrece la funcionalidad de **Descargar reportes en formato Excel** (separados por variable) para el análisis histórico de la data.

3.  **Gestión de la Plataforma:**
    * **Administración de Usuarios:** Incluye un módulo de `Usuarios` para la gestión de cuentas y accesos.

---

## ⚙️ Arquitectura y Tecnologías

| Categoría | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Adquisición de Datos** | **PLC** (Controlador Lógico Programable) | Utilizado para la lectura y control directo de los sensores en el entorno industrial. |
| **Middleware / Integración** | **Node-RED** | Plataforma de programación basada en flujo utilizada para conectar el PLC con la base de datos y manejar la lógica de datos. |
| **Base de Datos** | **Firebase** | Utilizado como la capa de persistencia en la nube. |
| **Tipo de DB** | **Realtime Database** | Almacenamiento en tiempo real, ideal para la data continua de sensores. |
| **Backend Web** | **Node.js** | Entorno de ejecución para el servidor web. |
| **Framework Web** | **Express.js** | Framework minimalista utilizado para construir la API y gestionar las rutas. |
| **Motor de Plantillas** | **EJS (Embedded JavaScript)** | Generación dinámica del HTML para el dashboard y las vistas de gráficos. |

---

## 🚀 Puesta en Marcha

Sigue estos pasos para tener una copia del proyecto funcionando en tu máquina local.

### Prerrequisitos

Necesitas tener instalado en tu sistema:

* **Node.js** (versión recomendada: 16 o superior)
* **npm** (viene incluido con Node.js)
* **Conexión a Firebase:** Debes configurar las credenciales de Firebase en el servidor para acceder a la Realtime Database.

### Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/OmarRMC/sistema-iot-industrial.git](https://github.com/OmarRMC/sistema-iot-industrial.git)
    cd sistema-iot-industrial
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Firebase:**
    * Crea un archivo de configuración para las credenciales de tu proyecto de Firebase.
    * Asegúrate de que la lógica en `index.js` o archivos relacionados pueda inicializar la conexión con la Realtime Database.

4.  **Ejecutar el Servidor:**
    ```bash
    npm start
    # O bien
    node index.js
    ```
    El sistema debería estar funcionando en `http://localhost:3000` (o el puerto configurado).

---

## 🗺️ Estructura de Directorios
sistema-iot-industrial/ 
├── src/ # Contiene los archivos fuente y recursos 
  │ ├── views/ # Archivos de plantilla EJS para el dashboard y módulos. │ ├── public/ # Archivos estáticos (CSS, JS de cliente, imágenes). │ └── (otros directorios) ├── index.js # Archivo principal del servidor (Node.js/Express), punto de entrada y manejador de rutas y conexión a Firebase. ├── package.json # Dependencias y scripts del proyecto. ├── vercel.json # Configuración para el despliegue en Vercel. └── .gitignore # Archivos a ignorar por Git.
