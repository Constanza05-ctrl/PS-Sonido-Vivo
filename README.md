# Sonido Vivo — Frontend (React + Vite)

Plataforma web e-commerce y panel de administración de **Sonido Vivo**, desarrollada con **React** y **Vite** bajo el patrón de arquitectura **Atomic Design**. Se integra con la API RESTful del backend a través de un proxy inverso relativo (`/api`), permitiendo su despliegue continuo en **AWS EC2** sin depender de direcciones IP estáticas.

- **Asignatura:** DESARROLLO FULLSTACK II_004D

- **Integrantes:**
  - Jesús Serrano
  - Thian Pereira
  - Constanza Carrasco

- **Repositorio Frontend:** https://github.com/Constanza05-ctrl/PS-Sonido-Vivo.git
- **Repositorio Backend:** https://github.com/Thian-Pereira/Backend-SonidoVivo.git

---

## Tecnologías y Arquitectura

- **Framework y Bundler:** React + Vite (`vite.config.js` con proxy `/api` hacia `http://127.0.0.1:8080`)
- **Arquitectura de Componentes:** Atomic Design (`atoms`, `molecules`, `organisms`, `templates`)
- **Gestión de Estado Global:** React Context API (`AuthContext`, `CarritoContext`, `ProductoContext`)
- **Seguridad y Control de Rutas:** Protección de vistas mediante JWT y validación de roles (`ProtectedRoute.jsx`) para `ADMIN` y `CLIENTE`
- **Testing Unitario:** Vitest (`vitest.config.js`) con reportes de cobertura en `coverage/`
- **Despliegue en Producción:** `vite preview` ejecutado como demonio persistente con PM2 en AWS EC2 (Ubuntu)

---

## Estructura Completa del Proyecto

```text
PS-Sonido-Vivo/
├── README.md                                   # Documentación principal del proyecto frontend
├── index.html                                  # Documento HTML raíz
├── package.json                                # Dependencias y scripts (dev, build, preview, test)
├── package-lock.json                           # Árbol exacto de dependencias
├── vite.config.js                              # Configuración de servidor/preview y proxy /api -> :8080
├── vitest.config.js                            # Configuración del entorno de pruebas Vitest
├── .env                                        # Variables de entorno del cliente (no versionado)
├── assets/
│   └── img/                                    # Imágenes estáticas de categorías e instrumentos
│       ├── accesorios.jpg
│       ├── amplificador.jpg
│       ├── bajo.jpg
│       ├── bateria.jpg
│       ├── estudio.jpg
│       ├── guitarra-acustica.jpg
│       ├── guitarra-electrica.jpg
│       ├── microfono.jpg
│       ├── pedal.jpg
│       └── teclado.jpg
├── coverage/                                   # Reportes HTML de cobertura generados por Vitest
├── css/
│   ├── catalogo.css                            # Estilos específicos del catálogo
│   └── style.css                               # Estilos base institucionales
├── js/
│   ├── admin.js                                # Lógica auxiliar de administración
│   ├── carrito.js                              # Lógica auxiliar de carrito
│   ├── catalogo.js                             # Lógica auxiliar de catálogo
│   └── productos.js                            # Definiciones auxiliares de productos
├── public/
│   ├── favicon.svg                             # Ícono del navegador
│   └── icons.svg                               # Sprite de íconos SVG
└── src/
    ├── main.jsx                                # Punto de entrada de React
    ├── App.jsx                                 # Enrutamiento general y protección de rutas por rol
    ├── App.css                                 # Estilos del componente raíz
    ├── index.css                               # Estilos globales de la aplicación
    ├── assets/
    │   ├── hero.png                            # Banner principal de inicio
    │   ├── react.svg                           # Recurso gráfico React
    │   └── vite.svg                            # Recurso gráfico Vite
    ├── components/                             # Componentes UI bajo Atomic Design
    │   ├── atoms/
    │   │   ├── Button.jsx                      # Botón base reutilizable
    │   │   ├── Button.test.jsx                 # Prueba unitaria de Button
    │   │   ├── CantidadInput.jsx               # Control numérico de unidades
    │   │   ├── Input.jsx                       # Campo de entrada de texto
    │   │   └── Label.jsx                       # Etiqueta de formulario
    │   ├── molecules/
    │   │   ├── BarraBusqueda.jsx               # Buscador en tiempo real del catálogo
    │   │   ├── CarritoItem.jsx                 # Fila de producto dentro del carrito
    │   │   ├── FiltroCategoria.jsx             # Selector de filtrado por categoría
    │   │   ├── FormField.jsx                   # Campo completo (Label + Input + validación)
    │   │   ├── FormField.test.jsx              # Prueba unitaria de FormField
    │   │   ├── ProductoCard.jsx                # Tarjeta visual de instrumento en catálogo
    │   │   └── ProductoCard.test.jsx           # Prueba unitaria de ProductoCard
    │   ├── organisms/
    │   │   ├── Footer.jsx                      # Pie de página institucional
    │   │   ├── ListaCarrito.jsx                # Listado de ítems agregados al carrito
    │   │   ├── ListaProductos.jsx              # Grilla responsiva de instrumentos
    │   │   ├── ListaProductos.test.jsx         # Prueba unitaria de ListaProductos
    │   │   ├── Navbar.jsx                      # Barra de navegación dinámica según sesión/rol
    │   │   ├── ProtectedRoute.jsx              # Guardia de acceso para rutas autenticadas y ADMIN
    │   │   └── ResumenCarrito.jsx              # Resumen de subtotales, descuentos y total a pagar
    │   └── templates/
    │       ├── CarritoTemplate.jsx             # Plantilla estructural de la vista de carrito
    │       ├── CatalogoTemplate.jsx            # Plantilla estructural del catálogo
    │       ├── CatalogoTemplate.test.jsx       # Prueba unitaria de CatalogoTemplate
    │       └── PublicTemplate.jsx              # Plantilla base con Navbar y Footer
    ├── config/
    │   └── apiConfig.js                        # Configuración de URLs de endpoints y modo API/Mock
    ├── context/
    │   ├── AuthContext.jsx                     # Estado global de autenticación, usuario y token JWT
    │   ├── CarritoContext.jsx                  # Estado global del carrito de compras
    │   └── ProductoContext.jsx                 # Estado global de productos y operaciones CRUD
    ├── data/
    │   ├── categorias.js                       # Listado de categorías musicales
    │   └── productos.js                        # Datos de respaldo para modo local/pruebas
    ├── pages/
    │   ├── Inicio.jsx                          # Página principal (Home)
    │   ├── Catalogo.jsx                        # Catálogo público con búsqueda y filtros
    │   ├── ProductoDetalle.jsx                 # Detalle completo de un instrumento
    │   ├── Carrito.jsx                         # Vista del carrito de compras
    │   ├── Checkout.jsx                        # Formulario de compra (retiro en tienda o despacho)
    │   ├── ResultadoCompra.jsx                 # Comprobante de pedido generado
    │   ├── Login.jsx                           # Inicio de sesión y registro de usuarios
    │   ├── Perfil.jsx                          # Perfil del usuario e historial de pedidos
    │   ├── Blog.jsx                            # Sección de noticias y artículos musicales
    │   ├── Nosotros.jsx                        # Información corporativa de Sonido Vivo
    │   ├── Contacto.jsx                        # Formulario de contacto
    │   ├── AccesoDenegado.jsx                  # Pantalla de error por permisos insuficientes
    │   ├── AdminProductos.jsx                  # Panel CRUD de administración de productos
    │   ├── AdminPedidos.jsx                    # Panel de administración y estados de órdenes
    │   └── AdminUsuarios.jsx                   # Panel CRUD de administración de usuarios y roles
    ├── services/
    │   ├── api.js                              # Cliente HTTP con inyección automática de Bearer JWT
    │   ├── authService.js                      # Servicios de login, registro y perfil
    │   ├── carritoService.js                   # Lógica de cálculo y persistencia del carrito
    │   ├── productoService.js                  # Consumo de endpoints CRUD de productos
    │   ├── productoService.test.js             # Pruebas unitarias de productoService
    │   └── usuarioService.js                   # Consumo de endpoints CRUD de usuarios
    ├── test/
    │   ├── PaginasPublicas.test.jsx            # Pruebas de integración de vistas públicas
    │   └── setup.js                            # Configuración global de Vitest
    └── utils/
        ├── precioProducto.js                   # Cálculo de precios finales con descuento
        └── validarProducto.js                  # Reglas de validación de formularios de productos
```

---

## Endpoints REST y Métodos CRUD Consumidos

El cliente HTTP (`src/services/api.js`) envía todas las peticiones utilizando el prefijo relativo `/api` y adjunta automáticamente la cabecera `Authorization: Bearer <token>` en las rutas protegidas.

### 1. Autenticación (`/api/auth`)
| Método | Endpoint | Acceso | Operación en el Frontend |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Público | Registra un nuevo usuario cliente desde `Login.jsx` |
| `POST` | `/api/auth/login` | Público | Autentica credenciales y almacena el JWT en `AuthContext.jsx` |
| `GET` | `/api/auth/me` | JWT | Recupera y valida los datos del usuario con sesión activa |

### 2. Catálogo y Administración de Productos (`/api/productos`)
| Método | Endpoint | Acceso | Operación CRUD en el Frontend |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/productos` | Público | **Read:** Carga el catálogo completo en `Catalogo.jsx` y `AdminProductos.jsx` |
| `GET` | `/api/productos/:id` | Público | **Read:** Obtiene la ficha técnica en `ProductoDetalle.jsx` |
| `POST` | `/api/productos` | **ADMIN (JWT)** | **Create:** Crea un nuevo instrumento desde `AdminProductos.jsx` |
| `PUT` | `/api/productos/:id` | **ADMIN (JWT)** | **Update:** Edita precio, stock, oferta y descripción en `AdminProductos.jsx` |
| `DELETE` | `/api/productos/:id` | **ADMIN (JWT)** | **Delete:** Elimina un producto del catálogo en `AdminProductos.jsx` |

### 3. Administración de Usuarios (`/api/usuarios`)
| Método | Endpoint | Acceso | Operación CRUD en el Frontend |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/usuarios` | **ADMIN (JWT)** | **Read:** Lista todos los usuarios registrados en `AdminUsuarios.jsx` |
| `POST` | `/api/usuarios` | **ADMIN (JWT)** | **Create:** Crea cuentas asignando rol (`ADMIN` o `CLIENTE`) en `AdminUsuarios.jsx` |
| `GET` | `/api/usuarios/:id` | JWT | **Read:** Consulta información detallada de un usuario por ID |
| `PUT` | `/api/usuarios/:id` | JWT | **Update:** Actualiza nombre, rol o estado activo en `AdminUsuarios.jsx` y `Perfil.jsx` |
| `DELETE` | `/api/usuarios/:id` | **ADMIN (JWT)** | **Delete:** Desactiva cuentas de usuario desde `AdminUsuarios.jsx` |

### 4. Pedidos y Administración de Órdenes (`/api/pedidos`)
| Método | Endpoint | Acceso | Operación CRUD en el Frontend |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/pedidos` | JWT | **Read:** Muestra historial propio en `Perfil.jsx` y todas las órdenes en `AdminPedidos.jsx` |
| `POST` | `/api/pedidos` | JWT | **Create:** Genera la orden de compra desde `Checkout.jsx` y descuenta stock |
| `PATCH` | `/api/pedidos/:numeroPedido` | **ADMIN (JWT)** | **Update:** Actualiza estado de entrega y estado de pago en `AdminPedidos.jsx` |
| `DELETE` | `/api/pedidos/:numeroPedido` | **ADMIN (JWT)** | **Delete:** Elimina una orden registrada desde `AdminPedidos.jsx` |

---

## Instalación, Pruebas y Despliegue en AWS EC2

1. **Clonar e instalar dependencias:**
   ```bash
   git clone https://github.com/Constanza05-ctrl/PS-Sonido-Vivo.git
   cd PS-Sonido-Vivo
   npm install
   ```

2. **Configurar variables de entorno (`.env` en la raíz del proyecto):**
   ```env
   VITE_API_URL=/api
   VITE_USE_MOCK=false
   VITE_ENDPOINT_LOGIN=/auth/login
   VITE_ENDPOINT_USUARIOS=/usuarios
   VITE_ENDPOINT_PRODUCTOS=/productos
   VITE_ENDPOINT_PEDIDOS=/pedidos
   ```

3. **Ejecutar pruebas unitarias y compilar para producción:**
   ```bash
   npm test
   npm run build
   ```

4. **Levantar el servidor en AWS EC2 con PM2 (puerto `5173`):**
   ```bash
   npx pm2 start "npx vite preview --host 0.0.0.0 --port 5173" --name front-sonido-vivo
   npx pm2 save
   ```

### Accesos y Credenciales de Prueba
- **Aplicación Web:** `http://<IP_PUBLICA_EC2>:5173`
- **Documentación Swagger API:** `http://<IP_PUBLICA_EC2>:5173/api/docs`
- **Usuario Administrador:** `admin@sonidovivo.cl` / `Admin123!`
- **Usuario Cliente:** `cliente@sonidovivo.cl` / `Cliente123!`