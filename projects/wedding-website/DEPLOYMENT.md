# 🚀 Deployment Guide - Wedding Website

Guía completa para desplegar la página web de matrimonio usando un flujo profesional de desarrollo.

## 📋 Prerrequisitos

### **1. Cuentas Necesarias**
- ✅ **GitHub**: Para control de versiones
- ✅ **Netlify**: Para hosting (gratis)
- ✅ **Google Cloud**: Para APIs (Sheets, Maps)

### **2. Herramientas Locales**
- ✅ **Git**: Control de versiones
- ✅ **Node.js**: Para herramientas de desarrollo
- ✅ **Editor**: VS Code recomendado

## 🔧 Configuración Inicial

### **Paso 1: Configurar Git**
```bash
# Configurar Git (si no está configurado)
git config --global user.name "Camilo Otoya"
git config --global user.email "camilootoya@habi.co"

# Verificar configuración
git config --list
```

### **Paso 2: Crear Repositorio en GitHub**
1. Ir a https://github.com/new
2. **Nombre**: `personal-projects`
3. **Descripción**: "Centralized repository for personal development projects"
4. **Visibilidad**: Público (para portfolio)
5. **NO** inicializar con README (ya tenemos uno)

### **Paso 3: Conectar Repositorio Local**
```bash
cd personal-projects
git init
git add .
git commit -m "feat: initial commit - personal projects monorepo"
git branch -M main
git remote add origin https://github.com/camilootoya/personal-projects.git
git push -u origin main
```

## 🌐 Configuración de Netlify

### **Paso 1: Crear Cuenta en Netlify**
1. Ir a https://netlify.com
2. Registrarse con GitHub
3. Autorizar acceso a repositorios

### **Paso 2: Crear Sitio**
1. **New site from Git**
2. **Conectar GitHub**
3. **Seleccionar repositorio**: `personal-projects`
4. **Configuración**:
   - **Build command**: `echo 'Static site'`
   - **Publish directory**: `projects/wedding-website`
   - **Branch**: `main`

### **Paso 3: Configurar Variables de Entorno**
En Netlify Dashboard → Site Settings → Environment Variables:
```
GOOGLE_SHEETS_API_KEY=tu_api_key_aqui
GOOGLE_MAPS_API_KEY=tu_api_key_aqui
SPREADSHEET_ID=tu_spreadsheet_id_aqui
```

## 🔄 Flujo de Desarrollo Profesional

### **Estructura de Branches**
```
main (producción)
├── develop (desarrollo)
├── feature/nueva-funcionalidad
├── feature/mejoras-ui
└── hotfix/correccion-urgente
```

### **Workflow Diario**
```bash
# 1. Crear nueva feature
git checkout develop
git pull origin develop
git checkout -b feature/mejora-rsvp

# 2. Desarrollar
# ... hacer cambios ...

# 3. Commit
git add .
git commit -m "feat: improve RSVP form validation"

# 4. Push
git push origin feature/mejora-rsvp

# 5. Crear Pull Request en GitHub
# 6. Review y merge a develop
# 7. Deploy automático a staging
```

## 🚀 Deployment Automático

### **GitHub Actions Configurado**
- ✅ **Push a main**: Deploy automático a producción
- ✅ **Pull Request**: Deploy automático a staging
- ✅ **Tests**: Validación antes de deploy

### **URLs de Deployment**
- **Producción**: https://sofia-camilo-wedding.netlify.app
- **Staging**: https://staging--sofia-camilo-wedding.netlify.app

## 📱 Dominio Personalizado

### **Opciones Recomendadas**
1. **Subdominio**: `wedding.camilootoya.com`
2. **Dominio dedicado**: `sofia-camilo.com`
3. **Subpath**: `camilootoya.com/wedding`

### **Configuración DNS**
```
# En tu proveedor de DNS
CNAME wedding.camilootoya.com → sofia-camilo-wedding.netlify.app
```

### **Configurar en Netlify**
1. Site Settings → Domain Management
2. Add custom domain
3. Configurar SSL automático

## 🔧 Comandos Útiles

### **Desarrollo Local**
```bash
# Servidor local
cd projects/wedding-website
python -m http.server 8000
# O
npx live-server --port=8000

# Con Node.js
npm run dev
```

### **Git Workflow**
```bash
# Ver estado
git status

# Ver branches
git branch -a

# Cambiar branch
git checkout nombre-branch

# Crear branch
git checkout -b nuevo-branch

# Merge
git merge nombre-branch

# Ver historial
git log --oneline
```

### **Deployment Manual**
```bash
# Deploy a staging
./deploy.sh staging

# Deploy a producción
./deploy.sh production
```

## 🧪 Testing y Validación

### **Antes de Deploy**
- ✅ Validar HTML: https://validator.w3.org/
- ✅ Validar CSS: https://jigsaw.w3.org/css-validator/
- ✅ Test responsive: Chrome DevTools
- ✅ Test formularios: Enviar datos de prueba
- ✅ Test APIs: Verificar Google Sheets/Maps

### **Después de Deploy**
- ✅ Verificar URL de producción
- ✅ Test en diferentes dispositivos
- ✅ Verificar formularios funcionan
- ✅ Verificar mapas cargan
- ✅ Test de velocidad: https://pagespeed.web.dev/

## 📊 Monitoreo

### **Métricas Importantes**
- **Uptime**: Disponibilidad del sitio
- **Performance**: Velocidad de carga
- **Form submissions**: Respuestas RSVP
- **Gift contributions**: Contribuciones recibidas

### **Herramientas de Monitoreo**
- **Netlify Analytics**: Métricas básicas
- **Google Analytics**: Análisis detallado
- **Uptime Robot**: Monitoreo de disponibilidad

## 🚨 Troubleshooting

### **Problemas Comunes**

#### **Deploy Fallido**
```bash
# Ver logs en GitHub Actions
# Verificar .github/workflows/deploy-wedding-website.yml
# Verificar netlify.toml
```

#### **Formularios No Funcionan**
```bash
# Verificar variables de entorno en Netlify
# Verificar API keys de Google
# Verificar CORS en Google Sheets
```

#### **Mapas No Cargan**
```bash
# Verificar Google Maps API key
# Verificar restricciones de dominio
# Verificar cuota de API
```

## 📞 Soporte

### **Recursos Útiles**
- **GitHub Docs**: https://docs.github.com/
- **Netlify Docs**: https://docs.netlify.com/
- **Google Sheets API**: https://developers.google.com/sheets/api
- **Google Maps API**: https://developers.google.com/maps/documentation

### **Contacto**
- **Email**: camilootoya@habi.co
- **GitHub**: [@camilootoya](https://github.com/camilootoya)

---

*Guía profesional para deployment y desarrollo continuo* 🚀
