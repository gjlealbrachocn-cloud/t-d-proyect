# T&D Perfums

Tienda online en español para perfumes árabes y decants, pensada para Argentina.

## Ejecutar localmente

1. Instalar Node.js 18 o superior.
2. Ejecutar `npm install`.
3. Copiar `.env.example` a `.env`.
4. Ejecutar `npm run dev` y abrir http://localhost:3000.

## Catálogo y pagos

El catálogo inicial está en `catalog.js`. Los tamaños 2, 5 y 10 ml son una propuesta de muestra; confirmar tamaños, stock y precios antes de vender. Los importes deben cargarse como números en pesos argentinos en `unitPrice`, siempre del lado del servidor.

La ruta `POST /api/checkout` crea una preferencia de Mercado Pago Checkout Pro y devuelve la URL segura de pago. Configurar `MP_ACCESS_TOKEN` en el entorno del servidor; nunca publicar ese token en el navegador ni en GitHub. Usar credenciales de prueba durante el desarrollo.

Esta es una primera versión de la tienda y del inicio de Checkout Pro. Antes de producción faltan completar precios y disponibilidad, datos y políticas de envío, persistencia de pedidos, notificaciones de pago (webhooks), dominio HTTPS y validación integral del flujo.

## Diseño

La identidad toma el logo de T&D Perfums y combina una estética editorial oscura con tonos arena y dorado. Las interacciones usan transiciones breves y contemplan la preferencia de movimiento reducido.
