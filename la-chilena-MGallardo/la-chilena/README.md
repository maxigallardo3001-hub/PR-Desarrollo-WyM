# La Chilena — Frontend

Sitio web frontend para "La Chilena", empanadería artesanal (empanadas al horno y fritas). Adaptación del Caso 19 (sistema de venta on-line).

Proyecto 100% HTML, CSS y JavaScript (sin backend). Los datos (productos, clientes, usuarios, pedidos) se simulan en el `localStorage` del navegador.

El sistema sigue un flujo de página responsiva, adaptada para cualquier dispositivo por medio de tabbar, barras colapsadas y otros elementos.

Se comenzó el diseño por medio de Figma, escalando al uso de HTML para el comienzo del frontend y para la simulación de backend y manejo de datos.

Se hace uso de JavaScript para mejorar la interacción con el usuario y la calidad visual, utilizando CSS puro (Vanilla CSS) con un sistema de variables personalizadas y simulación de consumo de API asíncrona para la validación de correos.

## Arquitectura y Decisiones de Desarrollo (Modelo)

Para dar solución a los requerimientos del sistema sin depender de un backend activo, el modelo de desarrollo se estructuró de la siguiente manera:

*   **Separación de Capas (MVC Frontend):** Se independizó la lógica de datos (`data.js`) y la lógica de autenticación/sesiones (`auth.js`) de las vistas HTML. Cada pantalla HTML actúa únicamente como la capa de presentación, consumiendo los métodos globales.
*   **Persistencia de Datos (Mock DB):** Se construyó una base de datos simulada en formato JSON utilizando el `localStorage` del navegador. La función `loadOrSeed()` inicializa los datos maestros (productos, clientes, usuarios) en la primera carga, y las operaciones de escritura modifican el estado local, permitiendo que el CRUD funcione de manera persistente entre recargas de página.
*   **Aislamiento de Sesiones:** El carrito de compras se enlaza dinámicamente al ID del cliente autenticado (`cartKey(clientId)`), asegurando que múltiples clientes no compartan el mismo estado en el mismo navegador.
*   **Interfaz Híbrida:** Se diseñó un sistema "Responsive" puro (Vanilla CSS). Las vistas de clientes utilizan un diseño web moderno y fluido, mientras que las vistas de los mantenedores administrativos emplean un sistema de DataGrids, Toolbars y ventanas modales inspirados en el diseño de aplicaciones Windows, cumpliendo con los RNF del proyecto.

## Demo

Sitio Web:

https://maxigallardo3001-hub.github.io/PR-Desarrollo-WyM/la-chilena-MGallardo/la-chilena/index.html

Repo:

https://github.com/maxigallardo3001-hub/PR-Desarrollo-WyM

## Cómo verlo localmente

No requiere instalación. Basta con abrir `index.html` en el navegador, o servirlo con XAMPP:

1. Copia la carpeta `la-chilena` dentro de `htdocs`.
2. Enciende Apache desde el panel de XAMPP.
3. Entra a `http://localhost/la-chilena/index.html`.

## Cuentas de prueba

| Perfil | Correo | Contraseña |
|---|---|---|
| Cliente | constanza@gmail.com | cliente123 |
| Administrador | admin@lachilena.cl | admin123 |
| Cajero virtual | cajero@lachilena.cl | cajero123 |
| Encargado de despacho | despacho@lachilena.cl | despacho123 |
| Dueño | dueno@lachilena.cl | dueno123 |

## Estructura

```text
index.html              Menú público, agregar al carrito, opciones de comida y vista general de la página principal
login.html              Inicio de sesión (los 5 perfiles) con verificación de correo y contraseña, se muestra ventana emergente en caso de error
registro.html           Registro de cliente, con todos los campos solicitados, verificación asíncrona para el correo correspondiente 
carrito.html            Carrito de compras, guardado en los archivos de js para simulación de base de datos
mis-pedidos.html        Historial de pedidos y anulación, guardado en los archivos de js para simulación de base de datos
admin-productos.html    Mantenedor de productos, permite añadir, cambiar o anular productos existentes
admin-clientes.html     Mantenedor de clientes, permite añadir clientes y registrarlos en el sistema
admin-usuarios.html     Mantenedor de usuarios internos, permite modificar o eliminar usuarios existentes
ventas.html             Confirmación de pago y boleta (cajero), permite la confirmación del pago para derivarlo a cocina y posteriormente a envío
despacho.html           Órdenes de despacho para cocina
reportes.html           Reporte de ventas por período, con estadísticas y métricas con filtrado 
ayuda.html              Centro de ayuda y manuales, simulación de manual básico para ayuda (Los documentos PDF no están disponibles, solo son una muestra)
assets/css/styles.css   Estilos del sitio utilizando CSS puro
assets/js/data.js       Datos simulados, utilizando JavaScript y formato JSON
assets/js/auth.js       Sesión y control de acceso por perfil
assets/img/hero.jpg     Imagen utilizada en Index y Login/Registro
