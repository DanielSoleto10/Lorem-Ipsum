<<<<<<< HEAD
# PDM
=======
# Lorem-Ipsum
>>>>>>> be9085528ecf3c9188fcf7dfe742a0540ad1f295
1. Introducción

El proyecto se centra en el desarrollo de una aplicación móvil diseñada para abordar los desafíos que enfrentan los agricultores en Bolivia, particularmente aquellos que están comenzando en el sector.  Estos desafíos incluyen la protección de los cultivos contra plagas y enfermedades, los altos costos de producción derivados de la crisis económica del país, y las dificultades para acceder a los mercados, especialmente para los nuevos agricultores.  La aplicación busca proporcionar a los agricultores acceso a información actualizada y herramientas efectivas para mitigar estos problemas, que a menudo resultan en bajas cosechas, pérdidas económicas y obstáculos en la venta de sus productos.    

2. Sobre el Proyecto

La aplicación móvil tiene como objetivo principal empoderar a los agricultores a través de la tecnología, ofreciéndoles una serie de funcionalidades clave:

Información sobre Manejo de Plagas y Enfermedades: La aplicación proporcionará a los agricultores información detallada y actualizada sobre la identificación, prevención y control de plagas y enfermedades que afectan a sus cultivos.    

Recomendaciones de Pesticidas Ecológicos: Se ofrecerán recomendaciones sobre el uso de pesticidas ecológicos, promoviendo prácticas agrícolas sostenibles que preserven la calidad del suelo y de las plantas.    

Plataforma de Conexión con Compradores: La aplicación facilitará la conexión directa entre los agricultores y los compradores potenciales, permitiendo a los agricultores publicar ofertas de venta de sus productos con información detallada y datos de contacto.    

3. Tabla de Contenidos

Introducción

Análisis PESTEL

Journey Map

Mapa de Empatía

Lienzo Propuesta de Valor

Tecnologías

Entorno de Desarrollo

Estructura de Archivo

Conclusiones

4. Propósito del Proyecto

El propósito fundamental de este proyecto es desarrollar una solución tecnológica accesible y efectiva que permita a los agricultores:

Mejorar la Productividad: Aumentar el rendimiento de sus cultivos mediante el acceso a información oportuna y precisa sobre el manejo de cultivos.    

Reducir Costos: Optimizar el uso de insumos, especialmente pesticidas, mediante la implementación de prácticas agrícolas más eficientes y sostenibles.    

Acceder a Mercados: Facilitar la venta directa de sus productos a precios justos, eliminando la dependencia de intermediarios.    

Promover la Sostenibilidad: Fomentar la adopción de prácticas agrícolas que protejan el medio ambiente y aseguren la viabilidad a largo plazo de la agricultura.    

5. Tecnologías

La aplicación se desarrollará utilizando las siguientes tecnologías clave:

Ionic: Se utilizará el framework Ionic para el desarrollo de la aplicación móvil híbrida.  Ionic permite crear una única base de código que se puede implementar tanto en dispositivos Android como iOS, lo que optimiza el tiempo y los recursos de desarrollo.   

APIs del Clima: Se integrarán APIs de servicios meteorológicos para proporcionar a los agricultores datos en tiempo real y pronósticos precisos sobre las condiciones climáticas, incluyendo información sobre temperatura, humedad y precipitaciones.

APIs de la Luna: Se incorporarán APIs que ofrezcan datos sobre las fases lunares, ya que algunos agricultores consideran que estas influyen en las prácticas agrícolas.

6. Entorno de Desarrollo

El entorno de desarrollo para este proyecto se define por las siguientes herramientas y configuraciones:

Sistema Operativo: Se utilizará el sistema operativo de preferencia del desarrollador (Windows, macOS o Linux).

Editor de Código: Visual Studio Code será el editor de código principal, debido a su amplia gama de extensiones, integración con Git y potentes herramientas de depuración.

Node.js y npm: Node.js será el entorno de ejecución de JavaScript, y npm (Node Package Manager) se utilizará para gestionar las dependencias y paquetes del proyecto.

Ionic CLI: La Interfaz de Línea de Comandos de Ionic (CLI) será esencial para crear, construir, emular y desplegar la aplicación.

Android SDK y/o Xcode: Se requerirá el SDK de Android (para dispositivos Android) y/o Xcode (para dispositivos iOS) para probar la aplicación en dispositivos reales o emuladores/simuladores.

Emuladores/Simuladores: Se utilizarán emuladores de Android y simuladores de iOS para realizar pruebas en diversos dispositivos y versiones de sistema operativo.

Git: Git se empleará para el control de versiones, facilitando la gestión de cambios y la colaboración.

Base de Datos: Firebase será la base de datos en la nube, proporcionando servicios de almacenamiento de datos en tiempo real, autenticación y alojamiento.

Herramientas de Depuración: Se utilizarán las herramientas de depuración integradas en Visual Studio Code y las herramientas de desarrollador de los navegadores web.

7. Estructura de Archivo

La estructura de archivos del proyecto Ionic se organiza de la siguiente manera (basada en las imágenes proporcionadas):

Movil/
├── .angular/           
├── .vscode/             
├── node_modules/      
├── src/                
│   ├── app/            
│   │   ├── auth/       
│   │   │   ├── forgot-password/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── services/   
│   │   │   ├── auth.service.ts
│   │   │   ├── luna.service.ts   
│   │   │   └── weather.service.ts
│   │   ├── usuarios/   
│   │   │   ├── agricultor/
│   │   │   │   ├── clima/
│   │   │   │   ├── luna/
│   │   │   │   ├── ventasA/
│   │   │   │   │   ├── home_agricultor... 
│   │   │   │   │   ├── home-agricultor.page.html
│   │   │   │   │   ├── home-agricultor.page.scss
│   │   │   │   │   └── home-agricultor.page.ts
│   │   │   ├── comprador/
│   │   │   │   └── perfil/
│   │   │   │       ├── perfil.page.html
│   │   │   │       ├── perfil.page.scss
│   │   │   │       ├── perfil.page.ts
│   │   │   │       └── perfil.routes.ts
│   │   │   └── auth.routes.ts
Explicación de los directorios clave:

Movil/: Es el directorio raíz del proyecto.

.angular/, .vscode/, node_modules/: Son directorios generados automáticamente o necesarios para el desarrollo.

src/: Contiene el código fuente de la aplicación.

src/app/: Es el directorio principal de la lógica de la aplicación.

src/app/auth/: Maneja la autenticación de usuarios.

src/app/services/: Contiene los servicios que proporcionan funcionalidades a la aplicación.

src/app/usuarios/: Organiza el código relacionado con los diferentes tipos de usuarios.

src/app/usuarios/agricultor/: Contiene el código específico para los usuarios agricultores, incluyendo la gestión de ventas, clima e información lunar.

src/app/usuarios/comprador/: Contiene el código específico para los usuarios compradores, incluyendo la gestión de perfiles.

Los archivos *.page.html, *.page.scss, *.page.ts y *.routes.ts son los componentes y la configuración de enrutamiento de las páginas.

9. Análisis del Proyecto

PESTEL: Se realizó un análisis PESTEL para comprender el contexto en el que se desarrollará y operará la aplicación.  Este análisis consideró los factores:   

Políticos: La inestabilidad política en Bolivia puede afectar las políticas de apoyo al sector agrícola.    
Económicos: La pobreza y la falta de recursos de muchos agricultores hacen crucial que la aplicación sea accesible y de bajo costo.    
Sociales: Los bajos niveles de educación y la limitada experiencia con la tecnología de algunos agricultores exigen una interfaz de usuario sencilla e intuitiva.    
Tecnológicos: La limitada conectividad a internet en zonas rurales requiere que la aplicación funcione sin conexión a internet y sea compatible con dispositivos de gama baja.    
Ecológicos: La vulnerabilidad de Bolivia al cambio climático subraya la importancia de promover prácticas agrícolas sostenibles.    
Legales: Las regulaciones sobre el uso de pesticidas y la protección de datos deben ser consideradas en el desarrollo de la aplicación.    
Journey Map: Se mapeó el recorrido del usuario (agricultor) para identificar sus necesidades, puntos de dolor y motivaciones en las diferentes etapas de interacción con la tecnología, desde el descubrimiento hasta la adopción o el abandono.    

Mapa de Empatía: Se desarrolló un Mapa de Empatía para comprender en profundidad la perspectiva de los agricultores, explorando qué piensan y sienten, qué ven, qué escuchan, qué dicen y hacen, cuáles son sus principales dolores y qué ganancias esperan obtener.    

Lienzo Propuesta de Valor: Se utilizó el Lienzo de Propuesta de Valor para alinear los productos y servicios de la aplicación con las necesidades y deseos de los agricultores, detallando cómo la aplicación alivia sus problemas y cómo genera valor para ellos.
