# Sonido Vivo
Integrantes:
[Thian Pereira] - [ thi.pereira@duocuc.cl ]
[Jesús Serrano] - [ jes.serrano@duocuc.cl ]
[Constanza Carrasco] - [ cons.carrascoc@duocuc.cl ]

## Descripción del proyecto

Sonido Vivo es una aplicación web desarrollada con React y Vite para presentar un catálogo de instrumentos musicales y equipos de sonido.

El proyecto utiliza una estructura basada en Atomic Design, con componentes reutilizables organizados por nivel de responsabilidad.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- Bootstrap
- React Router DOM
- Vitest
- React Testing Library

## Requisitos previos

Para ejecutar el proyecto se necesita tener instalado Node.js y npm.

## Instalación

Clonar el repositorio y entrar a la carpeta del proyecto:

```bash
git clone https://github.com/Constanza05-ctrl/PS-Sonido-Vivo.git
cd PS-Sonido-Vivo
```

Instalar las dependencias:

```bash
npm install
```

## Ejecución del proyecto

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir en el navegador la dirección local que indique la terminal.

## Pruebas

Ejecutar todas las pruebas una vez:

```bash
npm run test:run
```

Ejecutar las pruebas con cobertura de código:

```bash
npm run coverage
```

La cobertura permite identificar qué partes del código fueron ejecutadas durante las pruebas.

## Estructura del proyecto

```text
src/
├── components/
│   ├── atoms/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Label.jsx
│   ├── molecules/
│   │   ├── FormField.jsx
│   │   └── ProductoCard.jsx
│   ├── organisms/
│   │   └── ListaProductos.jsx
│   └── templates/
│       └── CatalogoTemplate.jsx
├── context/
│   └── ProductoContext.jsx
├── data/
│   └── productos.js
├── pages/
│   ├── Inicio.jsx
│   └── Catalogo.jsx
├── services/
│   └── productoService.js
├── test/
│   └── setup.js
├── App.jsx
└── main.jsx
```

La estructura puede variar a medida que el equipo incorpore nuevas funcionalidades.

## Organización de los componentes

- **Atoms:** elementos básicos reutilizables, como botones, etiquetas y campos de entrada.
- **Molecules:** componentes formados por varios átomos, como los campos de formulario y las tarjetas de productos.
- **Organisms:** secciones que agrupan componentes, como la lista de productos.
- **Templates:** estructuras que organizan la presentación de una página.
- **Pages:** páginas que conectan los componentes con la navegación y los datos.
- **Services:** funciones para gestionar las operaciones sobre los productos.
- **Context:** estado compartido de los productos.
- **Data:** datos iniciales de ejemplo.

## Datos de los productos

Los productos iniciales se encuentran en `src/data/productos.js`. El servicio permite consultar, agregar, actualizar y eliminar productos durante la ejecución de la aplicación.

Actualmente, estos datos se gestionan en memoria; no se debe asumir que los cambios se conservan al reiniciar la aplicación.

## Pruebas automatizadas

Las pruebas utilizan Vitest y React Testing Library para comprobar el comportamiento de los componentes y las funciones del servicio.

El resultado de cobertura debe consultarse ejecutando `npm run coverage`.