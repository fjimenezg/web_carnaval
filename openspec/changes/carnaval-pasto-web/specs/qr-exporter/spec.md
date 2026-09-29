# Spec Delta: qr-exporter

## Purpose

Permite generar, previsualizar e imprimir hojas de fichas con códigos QR decorados y listos para recortar y colocar en la cartelera física del stand escolar de la feria de la ciencia.

## ADDED Requirements

### Requirement: Generación dinámica de códigos QR por categoría
El sistema SHALL generar códigos QR legibles y nítidos para la URL principal del portal y para cada una de las categorías culturales individuales (`#carrozas`, `#murgas`, `#comparsas`, `#colectivos`, `#dias-clave`).

#### Scenario: Visualización de códigos QR por categoría
- **WHEN** se accede a la vista de impresión o exportación de QRs
- **THEN** el sistema renderiza un código QR funcional por cada categoría configurada en el sistema.

### Requirement: Formato de tarjeta imprimible para cartelera escolar
El sistema SHALL presentar las fichas en un formato adaptado a impresión (CSS `@media print`), con marcos decorativos festivos, el título de la categoría, el código QR centrado y una llamada a la acción clara para los visitantes ("¡Escanéame con tu celular!").

#### Scenario: Activación de la vista de impresión
- **WHEN** el usuario presiona el botón "Imprimir Tarjetas para Cartelera"
- **THEN** el navegador abre el diálogo nativo de impresión mostrando las tarjetas organizadas en una cuadrícula optimizada para papel tamaño Carta o A4.
