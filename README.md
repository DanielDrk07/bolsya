# 💰 Bolsya - Gestión Financiera Personal

<div align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" />
</div>

## 📱 Descripción

**Bolsya** es una aplicación móvil de gestión financiera personal que te permite llevar un control completo de tus ingresos y gastos. Con un asistente de IA integrado, obtén recomendaciones personalizadas y análisis inteligentes de tus finanzas.

### ✨ Características Principales

- 🔐 **Autenticación Local** - Sistema de registro e inicio de sesión con email y contraseña
- 📊 **Dashboard Interactivo** - Visualiza tu balance, ingresos y gastos con gráficos de torta
- 💸 **Gestión de Transacciones** - Registra ingresos y gastos con categorías personalizables
- 🏷️ **Categorías Personalizadas** - Crea y gestiona tus propias categorías con iconos y colores
- 🤖 **Asistente IA con Gemini** - Chat inteligente que analiza tus datos financieros y te brinda recomendaciones
- 💾 **Base de Datos Local SQLite** - Todos tus datos se almacenan de forma segura en tu dispositivo
- 📈 **Estadísticas en Tiempo Real** - Análisis automático de gastos e ingresos por categoría

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework para desarrollo móvil multiplataforma
- **Expo** - Plataforma para desarrollo y despliegue de aplicaciones React Native
- **SQLite** - Base de datos relacional local
- **Google Gemini API** - IA generativa para el asistente financiero
- **React Navigation** - Navegación entre pantallas con tabs y stacks
- **React Native Chart Kit** - Visualización de datos con gráficos
- **AsyncStorage** - Persistencia de sesión de usuario

## 📋 Requisitos Previos

- Node.js v18 o superior
- npm o yarn
- Expo Go app (para probar en dispositivo físico)
- Android Studio o Xcode (opcional, para emuladores)

## 🚀 Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/bolsya.git
cd bolsya
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura tu API Key de Gemini**

Obtén una API Key gratuita en [Google AI Studio](https://aistudio.google.com/apikey)

Abre `src/services/aiService.js` y reemplaza:
```javascript
const API_KEY = "TU_API_KEY_AQUI";
```

4. **Inicia la aplicación**
```bash
npx expo start
```

5. **Ejecuta en tu dispositivo**
- Escanea el código QR con **Expo Go** (Android) o la cámara (iOS)
- O presiona `a` para Android emulator / `i` para iOS simulator

## 📱 Pantallas

### 🏠 Dashboard
- Resumen del mes actual (Balance, Ingresos, Gastos)
- Gráficos por categorías
- Actualización en tiempo real

### 💰 Transacciones
- Lista de todas tus transacciones
- Agregar nuevos ingresos o gastos
- Selección de categoría, monto, fecha y descripción
- Eliminar transacciones (mantener presionado)

### 🏷️ Categorías
- Vista de categorías por tipo (Ingresos/Gastos)
- Crear categorías personalizadas
- Selector de iconos y colores
- Editar/eliminar categorías propias
- Categorías predefinidas protegidas

### 🤖 Asistente IA
- Chat conversacional con IA
- Análisis automático de tus datos financieros
- Recomendaciones personalizadas
- Preguntas frecuentes sugeridas
- Historial de conversación guardado

### 👤 Perfil
- Información del usuario
- Cerrar sesión

## 🗄️ Estructura de la Base de Datos
```sql
-- Usuarios
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Categorías
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
  color TEXT DEFAULT '#6366f1',
  icon TEXT DEFAULT 'help-circle',
  is_default INTEGER DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Transacciones
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
  date DATETIME NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- Historial de chat con IA
CREATE TABLE chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 📁 Estructura del Proyecto
```
bolsya/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── StatCard.js
│   │   └── CategoryChart.js
│   ├── screens/             # Pantallas de la app
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── TransactionsScreen.js
│   │   ├── AddTransactionScreen.js
│   │   ├── CategoriesScreen.js
│   │   ├── AddCategoryScreen.js
│   │   ├── AIChatScreen.js
│   │   └── ProfileScreen.js
│   ├── database/            # Configuración de SQLite
│   │   ├── database.js
│   │   └── queries.js
│   ├── contexts/            # Context API
│   │   └── AuthContext.js
│   ├── navigation/          # Navegación
│   │   ├── AuthNavigator.js
│   │   └── AppNavigator.js
│   ├── services/            # Servicios externos
│   │   └── aiService.js
│   ├── utils/               # Utilidades
│   │   └── dateUtils.js
│   └── constants/           # Constantes
│       ├── colors.js
│       └── defaultCategories.js
├── assets/
├── App.js
└── package.json
```

## 🎨 Paleta de Colores
```javascript
primary: '#6366f1'      // Azul principal
success: '#10b981'      // Verde (ingresos)
danger: '#ef4444'       // Rojo (gastos)
background: '#f8fafc'   // Fondo claro
card: '#ffffff'         // Tarjetas
text: '#1e293b'         // Texto principal
textSecondary: '#64748b' // Texto secundario
```

## 🔒 Seguridad

- Las contraseñas se almacenan con hash SHA-256
- Los datos financieros se guardan localmente en SQLite
- No se envía información sensible a servidores externos
- La API Key de Gemini debe mantenerse privada

⚠️ **Importante**: No subas tu API Key a repositorios públicos

## 🚧 Próximas Mejoras

- [ ] Filtros de fecha personalizados
- [ ] Exportar datos a CSV
- [ ] Presupuestos y alertas
- [ ] Gráficos de tendencias mensuales
- [ ] Modo oscuro
- [ ] Backup en la nube
- [ ] Multi-moneda
- [ ] Recordatorios de gastos recurrentes

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@DanielDrk07](https://github.com/DanielDrk07)
- Email: josedanielburbano257@gmail.com


<div align="center">
  Hecho con ❤️ y ☕
</div>
```


