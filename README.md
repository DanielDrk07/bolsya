# 💰 Bolsya - Gestión Financiera Personal

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" />
</p>

App móvil de gestión financiera personal desarrollada con React Native y Expo. Lleva el control completo de tus ingresos y gastos de manera simple, intuitiva y completamente offline.

---

## 📱 Características Principales

✨ **Dashboard Interactivo**
- Visualiza tu balance mensual en tiempo real
- Gráficos de torta por categorías de gastos e ingresos
- Estadísticas detalladas del mes actual

💸 **Gestión de Transacciones**
- Registra ingresos y gastos fácilmente
- Categorización automática con iconos visuales
- Añade descripciones opcionales a cada transacción
- Visualiza tu historial completo de movimientos

📁 **Categorías Personalizables**
- 12 categorías predefinidas (8 gastos + 4 ingresos)
- Crea tus propias categorías personalizadas
- Amplia selección de iconos y colores
- Gestiona, edita o elimina categorías según tus necesidades

🔒 **Seguridad y Privacidad**
- Autenticación local con email y contraseña
- Datos almacenados localmente en tu dispositivo
- Encriptación de contraseñas con SHA-256
- Sin conexión a internet requerida

---

## 🎨 Capturas de Pantalla



## 🚀 Comenzando

### Prerequisitos

- [Node.js](https://nodejs.org/) (v14 o superior)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) instalado en tu dispositivo móvil

### Instalación

1. **Clona el repositorio**
```bash
   git clone https://github.com/DanielDrk07/bolsya.git
   cd bolsya
```

2. **Instala las dependencias**
```bash
   npm install
```

3. **Inicia el servidor de desarrollo**
```bash
   npx expo start
```

4. **Escanea el código QR**
   - **Android:** Usa la app Expo Go para escanear el código QR
   - **iOS:** Usa la cámara del iPhone para escanear el código QR

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|-----------|-----------|
| **React Native** | Framework principal para desarrollo móvil |
| **Expo** | Plataforma de desarrollo y herramientas |
| **SQLite** | Base de datos local relacional |
| **React Navigation** | Sistema de navegación entre pantallas |
| **React Native Chart Kit** | Visualización de gráficos y estadísticas |
| **Expo Crypto** | Encriptación de contraseñas |
| **AsyncStorage** | Almacenamiento de sesión del usuario |

---

## 📂 Estructura del Proyecto
```
bolsya/
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── StatCard.js       # Tarjeta de estadísticas
│   │   └── CategoryChart.js  # Gráfico de categorías
│   ├── screens/              # Pantallas principales
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── TransactionsScreen.js
│   │   ├── AddTransactionScreen.js
│   │   ├── CategoriesScreen.js
│   │   ├── AddCategoryScreen.js
│   │   └── ProfileScreen.js
│   ├── database/             # Lógica de base de datos
│   │   ├── database.js       # Configuración SQLite
│   │   └── queries.js        # Consultas y operaciones
│   ├── contexts/             # Context API
│   │   └── AuthContext.js    # Autenticación de usuarios
│   ├── navigation/           # Configuración de navegación
│   │   ├── AuthNavigator.js
│   │   └── AppNavigator.js
│   ├── utils/                # Funciones utilitarias
│   │   └── dateUtils.js      # Formateo de fechas y moneda
│   └── constants/            # Constantes y configuración
│       ├── colors.js         # Paleta de colores
│       └── defaultCategories.js
├── App.js                    # Punto de entrada principal
├── package.json
└── README.md
```

---

## 📊 Modelo de Base de Datos

### Tablas

**users**
```sql
- id (INTEGER PRIMARY KEY)
- email (TEXT UNIQUE)
- password_hash (TEXT)
- created_at (DATETIME)
```

**categories**
```sql
- id (INTEGER PRIMARY KEY)
- user_id (INTEGER)
- name (TEXT)
- type (TEXT: 'income' | 'expense')
- color (TEXT)
- icon (TEXT)
- is_default (INTEGER: 0 | 1)
```

**transactions**
```sql
- id (INTEGER PRIMARY KEY)
- user_id (INTEGER)
- category_id (INTEGER)
- amount (REAL)
- type (TEXT: 'income' | 'expense')
- date (DATETIME)
- description (TEXT)
- created_at (DATETIME)
```

---

## 💡 Uso de la App

### 1. Registro e Inicio de Sesión
- Crea una cuenta con tu email y contraseña
- Inicia sesión para acceder a tus finanzas

### 2. Dashboard
- Visualiza tu balance, ingresos y gastos del mes
- Revisa gráficos detallados por categoría
- Desliza hacia abajo para actualizar

### 3. Agregar Transacciones
- Ve a la pestaña "Transacciones"
- Toca el botón "+" flotante
- Selecciona tipo (Ingreso/Gasto)
- Ingresa monto y selecciona categoría
- Añade una descripción opcional
- Guarda la transacción

### 4. Gestionar Categorías
- Ve a la pestaña "Categorías"
- Cambia entre pestañas de Gastos e Ingresos
- Toca "+" para crear nuevas categorías
- Toca una categoría para editarla
- Mantén presionado para eliminar

### 5. Perfil
- Revisa tu información de usuario
- Cierra sesión cuando lo necesites

---

## 🔧 Scripts Disponibles
```bash
# Iniciar servidor de desarrollo
npm start

# Limpiar caché e iniciar
npx expo start -c

# Ejecutar en Android
npx expo start --android

```

---

## 📦 Dependencias Principales
```json
{
  "expo": "~54.0.20",
  "react": "18.3.1",
  "react-native": "0.76.5",
  "expo-sqlite": "^15.0.4",
  "expo-crypto": "^14.0.1",
  "@react-navigation/native": "^6.x",
  "@react-navigation/bottom-tabs": "^6.x",
  "@react-navigation/native-stack": "^6.x",
  "react-native-chart-kit": "^6.x",
  "@react-native-async-storage/async-storage": "^2.x"
}
```
## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub:DanielDrk07
- LinkedIn:https://www.linkedin.com/in/jose-daniel-burbano-bb733b328/

---

## 🙏 Agradecimientos

- [Expo](https://expo.dev/) por la excelente plataforma de desarrollo
- [React Native](https://reactiveative.dev/) por el framework
- [Ionicons](https://ionic.io/ionicons) por los iconos
- Comunidad de React Native por el soporte

---

## ⭐ Dale una estrella

Si este proyecto te fue útil, ¡considera darle una estrella! ⭐

---

<p align="center">
  Hecho con ❤️ y ☕
</p>
```

MIT License

Copyright (c) 2025 Jose Daniel Burbano Aponte

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

