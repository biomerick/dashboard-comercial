# Dashboard Comercial - Megamedia

Este proyecto es una aplicación web frontend desarrollada con **React** y **Vite** para la gestión comercial y creación de campañas de prospección. Utiliza **Ant Design** como librería de componentes UI.

## 🚀 Stack Tecnológico

*   **Build Tool:** Vite
*   **Framework:** React 18+
*   **Lenguaje:** TypeScript
*   **UI Library:** Ant Design 5.x
*   **Routing:** React Router DOM
*   **Iconos:** Lucide React & @ant-design/icons
*   **Editor de Texto:** React Quill New
*   **Gráficos:** Recharts
*   **Gestor de Paquetes:** pnpm

## 📋 Requisitos Previos

*   Node.js (versión 18 o superior recomendada)
*   pnpm (instalado globalmente vía `npm install -g pnpm`)

## 🛠️ Instalación y Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/biomerick/dashboard-comercial.git
    cd dashboard-comercial
    ```

2.  **Instalar dependencias:**

    ```bash
    pnpm install
    ```

3.  **Iniciar el servidor de desarrollo:**

    ```bash
    pnpm dev
    ```

    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique la consola).

## 📂 Estructura del Proyecto

```
dashboard-comercial/
├── client/
│   ├── src/
│   │   ├── api/            # Servicios simulados (Mocks) para Leads y Campañas
│   │   ├── components/     # Componentes reutilizables y Layouts
│   │   ├── config/         # Configuración global (Tema de AntD)
│   │   ├── data/           # Catálogos maestros (Productos, Verticales, Prompts)
│   │   ├── pages/          # Vistas principales (Dashboard, NewCampaign)
│   │   ├── types/          # Definiciones de tipos TypeScript
│   │   ├── App.tsx         # Configuración de rutas
│   │   └── main.tsx        # Punto de entrada
├── public/                 # Assets estáticos
└── package.json            # Dependencias y scripts
```

## ✨ Funcionalidades Principales

### 1. Dashboard Principal
*   Visualización de KPIs comerciales (Ventas, Leads, Conversión).
*   Gráfico de barras de leads por campaña.
*   Tabla resumen de últimas campañas con estado y ROI.

### 2. Wizard de Nueva Campaña (Prospección)
Herramienta de 5 pasos para crear y lanzar campañas:
1.  **Datos y Segmentación:** Selección de vertical y producto (Catálogo Megamedia), y definición de ubicación geográfica.
2.  **Definición ICP:** Generación simulada de Perfil de Cliente Ideal (ICP) asistida por IA.
3.  **Prospección:** Búsqueda simulada de leads en Google Maps basada en la ubicación y vertical.
4.  **Personalización:** Edición de mensajes de correo 1 a 1 para los leads seleccionados.
5.  **Lanzamiento:** Resumen final y envío de la campaña.

## ⚠️ Notas para Desarrolladores

*   **Servicios Mock:** Actualmente, las llamadas a backend (`src/api/`) son simuladas. `fetchLeadsMock` devuelve datos estáticos para demostración. Para producción, debe integrarse con la API real de Google Places.
*   **Generación IA:** La generación de ICP es una simulación. Se debe conectar a un endpoint real de OpenAI/LLM.
*   **Compatibilidad React 19:** Se utiliza `@ant-design/v5-patch-for-react-19` y `react-quill-new` para asegurar compatibilidad con las últimas versiones de React.

## 🤝 Contribución

1.  Hacer fork del repositorio.
2.  Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3.  Hacer commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`).
4.  Hacer push a la rama (`git push origin feature/nueva-funcionalidad`).
5.  Abrir un Pull Request.
