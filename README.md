# 💒 Página Web de Matrimonio - María & Juan

Una página web moderna, romántica y elegante para tu boda, creada desde cero con HTML, CSS y JavaScript.

## ✨ Características

### 🎨 **Diseño Elegante**
- Diseño responsive que se ve perfecto en móviles y desktop
- Colores dorados elegantes (#d4af37) con detalles románticos
- Tipografías hermosas (Dancing Script, Playfair Display, Open Sans)
- Efectos de parallax y animaciones suaves

### 📱 **Secciones Incluidas**
- **Hero Section** con foto de fondo y botón RSVP
- **Nuestra Historia** con 3 párrafos personalizados y fotos
- **Cuándo y Dónde** con detalles de ceremonia y recepción
- **Regalos** con 9 opciones y barras de progreso dinámicas
- **RSVP Avanzado** con opciones de transporte y menú
- **Galería** de 16 fotos optimizada para móvil
- **Recomendaciones** de hospedaje y turismo

### ⚡ **Funcionalidades Avanzadas**
- Formularios conectados a Google Sheets
- Barras de progreso dinámicas en regalos
- Mapas de Google integrados
- Sistema de notificaciones elegante
- Efecto confetti al confirmar asistencia
- Navegación suave entre secciones
- Validación de formularios en tiempo real

## 🚀 Instalación y Uso

### **Uso Básico**
1. Abre `index.html` en tu navegador
2. Personaliza el contenido según tu boda
3. Reemplaza los placeholders de imágenes con tus fotos

### **Personalización Rápida**
1. **Nombres**: Cambia "María & Juan" en el HTML
2. **Fechas**: Actualiza las fechas en el JavaScript
3. **Ubicaciones**: Modifica las direcciones en el HTML
4. **Fotos**: Reemplaza los placeholders con tus imágenes reales

## 🔧 Configuración Avanzada

### **Google Sheets Integration**
Para conectar los formularios a Google Sheets:

1. **Configura Google Sheets API**:
   ```javascript
   // En google-sheets-config.js
   const GOOGLE_SHEETS_CONFIG = {
       API_KEY: 'TU_API_KEY_DE_GOOGLE_SHEETS',
       SPREADSHEET_ID: 'TU_ID_DE_HOJA_DE_CALCULO',
       // ... más configuración
   };
   ```

2. **Crea las hojas de cálculo**:
   - `RSVP_Responses`: Para respuestas del formulario RSVP
   - `Gift_Contributions`: Para contribuciones de regalos

3. **Habilita las APIs necesarias**:
   - Google Sheets API
   - Google Maps JavaScript API

### **Google Maps Integration**
Para mapas interactivos:

1. **Obtén una API key de Google Maps**
2. **Actualiza las coordenadas**:
   ```javascript
   // En google-maps-config.js
   LOCATIONS: {
       CEREMONY: {
           lat: 4.6097, // Coordenadas reales
           lng: -74.0817,
           // ...
       }
   }
   ```

## 📁 Estructura de Archivos

```
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # Funcionalidad JavaScript
├── google-sheets-config.js # Configuración Google Sheets
├── google-maps-config.js   # Configuración Google Maps
└── README.md               # Este archivo
```

## 🎨 Personalización Visual

### **Colores**
- **Dorado principal**: #d4af37
- **Dorado claro**: #f4e4bc
- **Grises**: #333, #666, #888
- **Fondos**: #fafafa, #f8f9fa

### **Tipografías**
- **Títulos**: Dancing Script (cursiva elegante)
- **Subtítulos**: Playfair Display (serif elegante)
- **Texto**: Open Sans (sans-serif limpio)

## 📱 Responsive Design

La página está optimizada para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔒 Seguridad

- Validación de formularios en frontend y backend
- Sanitización de datos de entrada
- API keys restringidas por dominio
- HTTPS recomendado para producción

## 🚀 Despliegue

### **Opciones de Hosting**
1. **GitHub Pages** (gratis)
2. **Netlify** (gratis con dominio personalizado)
3. **Vercel** (gratis)
4. **Hosting tradicional** (cualquier servidor web)

### **Pasos para Despliegue**
1. Sube todos los archivos a tu servidor
2. Configura las API keys en producción
3. Prueba todos los formularios
4. Verifica que los mapas funcionen correctamente

## 🛠️ Mantenimiento

### **Actualizaciones Regulares**
- Revisar respuestas de RSVP
- Actualizar barras de progreso de regalos
- Añadir nuevas fotos a la galería
- Mantener información de contacto actualizada

### **Backup**
- Respalda regularmente los datos de Google Sheets
- Guarda copias de las imágenes
- Documenta cualquier personalización realizada

## 📞 Soporte

Para dudas o problemas:
1. Revisa este README
2. Verifica la consola del navegador para errores
3. Confirma que las API keys sean válidas
4. Asegúrate de que todos los archivos estén en el servidor

## 🎉 ¡Disfruta tu Gran Día!

Esta página web está diseñada para hacer que tu boda sea aún más especial. ¡Que tengas un día maravilloso! 💕

---

*Creado con ❤️ para tu gran día*
