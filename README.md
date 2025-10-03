# 🚨 Sistema de Gestión de Incidencias y Cámaras  

Backend desarrollado con **Node.js, Express y Sequelize**, que permite la gestión de incidencias de seguridad ciudadana.  
Incluye autenticación con **roles y permisos**, administración de **jurisdicciones y cámaras**, y soporte para **notificaciones en tiempo real**.  

---

## ✨ Características  

- 🔑 **Login de usuarios** con roles y permisos.  
- 👥 **Gestión de roles y permisos** (relación many-to-many).  
- 📝 **Incidencias**: código, jurisdicción y cámara asociada.  
- 📍 Administración de **jurisdicciones y cámaras**.  
- ✅ Validaciones estrictas en **handlers**.  
- ⚡ **WebSockets** para notificaciones en tiempo real.  
- 🗄️ Arquitectura limpia y modular.  

---

## 📂 Estructura del proyecto  

```bash
├── controllers/          # Lógica de negocio
├── handlers/             # Validaciones y manejo de requests/responses
├── models/               # Modelos Sequelize
├── routes/               # Rutas del sistema
├── db_connection.js      # Configuración de la base de datos
├── server.js             # Punto de entrada principal
├── sockets.js            # Configuración de WebSockets
└── package.json
