# 🔧 Configuración de APIs de Google

## 📋 APIs Necesarias

### **1. Google Sheets API**
- **Propósito**: Guardar respuestas RSVP y contribuciones de regalos
- **Documentación**: https://developers.google.com/sheets/api

### **2. Google Maps JavaScript API**
- **Propósito**: Mostrar mapas de ceremonia y recepción
- **Documentación**: https://developers.google.com/maps/documentation/javascript

## 🚀 Pasos de Configuración

### **Paso 1: Crear Proyecto en Google Cloud**
1. Ir a https://console.cloud.google.com/
2. **Crear proyecto** o seleccionar existente
3. **Nombre**: `sofia-camilo-wedding` (o similar)

### **Paso 2: Habilitar APIs**
```bash
# APIs necesarias
- Google Sheets API
- Google Maps JavaScript API
```

### **Paso 3: Crear Credenciales**
1. **APIs & Services** → **Credentials**
2. **Create Credentials** → **API Key**
3. **Copiar API Key**

### **Paso 4: Configurar Restricciones**
```bash
# Restricciones de aplicación
- HTTP referrers (web sites)
- Dominios permitidos:
  - *.netlify.app
  - localhost:8000
  - 127.0.0.1:8000
```

### **Paso 5: Configurar Google Sheets**
1. **Crear hoja de cálculo** en Google Sheets
2. **Crear hojas**:
   - `RSVP_Responses`
   - `Gift_Contributions`
3. **Configurar columnas** según el código
4. **Compartir** con la cuenta de servicio

### **Paso 6: Configurar Variables de Entorno**
```bash
# En Netlify Dashboard
GOOGLE_SHEETS_API_KEY=tu_api_key_aqui
GOOGLE_MAPS_API_KEY=tu_api_key_aqui
SPREADSHEET_ID=tu_spreadsheet_id_aqui
```

## 📁 Estructura de Google Sheets

### **Hoja: RSVP_Responses**
```
A: Timestamp
B: Nombre
C: Email
D: Teléfono
E: Asistencia
F: Menú
G: Transporte
H: Canción
I: Mensaje
```

### **Hoja: Gift_Contributions**
```
A: Timestamp
B: Nombre
C: Email
D: Regalo
E: Monto
F: Mensaje
```

## 🔧 Configuración en el Código

### **google-sheets-config.js**
```javascript
const GOOGLE_SHEETS_CONFIG = {
    API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
    SHEETS: {
        RSVP: 'RSVP_Responses',
        GIFTS: 'Gift_Contributions'
    }
};
```

### **google-maps-config.js**
```javascript
const GOOGLE_MAPS_CONFIG = {
    API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    LOCATIONS: {
        CEREMONY: {
            lat: 4.6097,
            lng: -74.0817,
            // ...
        }
    }
};
```

## 🧪 Testing

### **Probar Google Sheets**
```javascript
// En la consola del navegador
testGoogleSheets();
```

### **Probar Google Maps**
```javascript
// En la consola del navegador
testGoogleMaps();
```

## 🚨 Troubleshooting

### **Error: API Key no válida**
- Verificar que la API key sea correcta
- Verificar restricciones de dominio
- Verificar que las APIs estén habilitadas

### **Error: CORS**
- Verificar restricciones de HTTP referrers
- Agregar dominio de Netlify a las restricciones

### **Error: Permisos de Sheets**
- Verificar que la hoja esté compartida
- Verificar permisos de escritura

## 📞 Soporte

### **Recursos Útiles**
- **Google Cloud Console**: https://console.cloud.google.com/
- **Google Sheets API**: https://developers.google.com/sheets/api
- **Google Maps API**: https://developers.google.com/maps/documentation/javascript

### **Contacto**
- **Email**: camilootoya@habi.co
- **GitHub**: [@camilootoya](https://github.com/camilootoya)

---

*Configuración profesional de APIs de Google* 🔧
