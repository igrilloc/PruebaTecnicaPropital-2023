# **PROPITAL** | Prueba Tecnica

## **📌 OBJETIVOS**

[Contexto] Un cliente desea desarrollar un sistema de visualización de proyectos inmobiliarios en un mapa interactivo. El objetivo del sistema es permitir a los usuarios explorar proyectos inmobiliarios en diferentes ubicaciones y obtener información detallada sobre ellos.

El sistema debe cumplir con los siguientes requisitos:

Visualización del mapa: El sistema debe mostrar un mapa interactivo donde se puedan ubicar los proyectos inmobiliarios. Se pueden utilizar bibliotecas o servicios como Google Maps, Mapbox u otros.
Marcadores de proyectos: Cada proyecto inmobiliario debe representarse en el mapa mediante un marcador. El marcador debe mostrar una vista previa del proyecto, como una imagen o un icono representativo.
Información detallada: Al hacer clic en un marcador, se debe mostrar una ventana emergente o una sección de detalles que contenga información adicional sobre el proyecto, como el nombre, la ubicación, una descripción y detalles relevantes.
Búsqueda y filtrado: El sistema debe permitir a los usuarios buscar proyectos inmobiliarios por ubicación o por otros criterios relevantes, como el tipo de propiedad, el precio, la superficie, etc. Además, los usuarios deben poder filtrar los proyectos por categorías.
Interacción y navegación: Los usuarios deben poder interactuar con el mapa para desplazarse, hacer zoom y explorar los proyectos inmobiliarios en diferentes áreas geográficas.
Persistencia de datos: El sistema debe obtener los datos de los proyectos inmobiliarios a través de una API o una base de datos. Asegúrate de tener un conjunto de datos de prueba disponible para utilizar en la prueba.

-  Diseña y desarrolla una API RESTful que permita a los clientes realizar las acciones mencionadas anteriormente.
-  Implementa una base de datos para almacenar la información de las propiedades y las ofertas. La base de datos debe reflejar el estado actual de cada propiedad y cada oferta.
-  Escribe pruebas unitarias para tu API.
-  Asegúrate de que tu código esté bien documentado y la documentación sea clara.

---
<br />

## **📋 SOBRE LA API**
En este proyecto la API **correrá localmente desde tu computadora**.

Para lograr que esta API funcione desde tu computadora deberás dirigirte, desde tu terminal, a la carpeta **`api`** y ejecutar el comando:

```bash
   npm install 
   npm start
```

Podrás ver el siguiente mensaje en tu terminal.

``` 
[0] 
[0] > server@1.0.0 server
[0] > nodemon index.js
[0] [nodemon] 2.0.22
[0] [nodemon] to restart at any time, enter `rs`
[0] [nodemon] watching path(s): *.*
[0] [nodemon] watching extensions: js,mjs,json
[0] [nodemon] starting `node index.js`
[0] Server listening on port 3001

```

Esto significa que la API ya está corriendo en tu computadora en el puerto 3001. Es decir que podrás acceder a ella desde la URL **`http://localhost:3001`**. Para poder comunicarte con esta API deberás dejar la terminal levantada.

**IMPORTANTE**
No debes modificar **NINGÚN** archivo dentro de la carpeta **`/api/server.js`**. Cualquier modificación en estos archivos puede alterar el funcionamiento normal de la API y de tu proyecto.

Para lograr correr los test de la Api, ejecuta el comando:

```bash
   npm test
```

---
<br />

## **⚠️ PARA COMENZAR...**
1. Deberás forkear este repositorio para tener una copia del mismo en tu cuenta personal de GitHub.

2. Clona el repositorio en tu computadora.

3. En la carpeta **`api`** deberás crear un archivo llamado: **`.env`** que tenga la siguiente forma:

   ```env
       DB_USER=usuariodepostgres
       DB_PASSWORD=passwordDePostgres
       DB_HOST=localhost
   ```

4. Reemplazar **`usuariodepostgres`** y **`passwordDePostgres`** con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

5. Adicionalmente será necesario que crees, **desde psql (shell o PGAdmin)**, una base de datos llamada **`propital`**. Si no realizas este paso de manera manual no podrás avanzar con el proyecto.

---
<br />

## **📖 INFORMACION GENERAL SOBRE LA BASE DE DATOS**

Cuando decidí diseñar una base de datos en PostgreSQL para gestionar oportunidades de compra de propiedades, opté por utilizar una relación de uno a muchos entre las entidades "Oportunidad/Propiedad" y "Ofertas" debido a las siguientes razones:

En primer lugar, consideré que una "Oportunidad/Propiedad" podría generar múltiples ofertas a lo largo del tiempo. Por ejemplo, un cliente interesado en adquirir una propiedad podría recibir varias propuestas de diferentes vendedores o agentes inmobiliarios. Al establecer una relación de uno a muchos, podría asociar cada oportunidad con todas las ofertas recibidas.

En segundo lugar, al utilizar una relación de uno a muchos, permití que una oferta pudiera estar vinculada a una sola oportunidad o propiedad, evitando así la confusión y la duplicación de datos. De esta manera, cada oferta se enfocaría únicamente en una oportunidad específica, lo que facilitaría el seguimiento de los progresos de cada negociación de manera individual.

Además, al implementar esta relación, pude aprovechar la eficiencia de PostgreSQL para almacenar grandes volúmenes de datos relacionados. La base de datos pudo organizar las ofertas según sus correspondientes oportunidades/propiedades, lo que optimizó las consultas y búsquedas de información. Esto me permitió mantener la base de datos bien estructurada y escalable, lo que es especialmente importante cuando se trata de un sistema en el que se espera un alto volumen de transacciones y datos.

- La base de datos utilizada fue PostgreSQL: https://www.postgresql.org/
- Como ORM para la coneccion de datos se utilizo la libreria Sequelize de Javascript: https://sequelize.org/

**📍 MODELO 1 | OFFER**

-  id (UUID). \*
-  title (STRING). \*
-  description (STRING). \*
-  category (ENUM("rent", "sale")). \*
-  price (INTEGER). \*
-  expiration (DATE).
-  stateOffer (ENUM("pending", "inactive", "expired", "cancelled", "active")).

<br />

**📍 MODELO 2 | OPPORTUNITY**

-  id (UUID). \*
-  nameOpportunity (STRING). \*
-  address (STRING). \*
-  image (en horas).
-  Temporada (ARRAY(STRING)). \*
-  location (STRING). \*
-  typeOfProperty (STRING). \*
-  city (STRING). \*
-  details (STRING). \*
-  area (DOUBLE). \*
-  latitude (DOUBLE). \*
-  length (DOUBLE). \*
-  state (ENUM("available", "not available", "paused")). \*

---
<br />

## **📖 INFORMACION GENERAL SOBRE LA API**

Esta API permite a los desarrolladores y usuarios obtener información detallada sobre propiedades residenciales y comerciales, incluyendo características, ubicación, precios y más.

Con la API de Consulta de Propiedades, los usuarios pueden realizar consultas personalizadas y obtener resultados precisos y actualizados. Esta API es especialmente útil para aplicaciones y sitios web relacionados con el mercado inmobiliario, agentes de bienes raíces y empresas que desean integrar información inmobiliaria en sus servicios.

Búsqueda de propiedades por ubicación, tipo, precio, tamaño y otras características. Acceso a detalles completos de propiedades, incluyendo descripciones y ofertas.
Filtros avanzados para refinar y personalizar las consultas de búsqueda. La API de Consulta de Propiedades está diseñada para ser fácilmente integrada en aplicaciones y sitios
web mediante el uso de solicitudes HTTP y respuestas en formato JSON. Se proporcionan ejemplos de código y documentación detallada para facilitar la implementación de la API.


### **RUTEO**

#### **📍 GET | /localhost:3001/api/offers**
Consulta todas las ofertas existentes en la base de datos.
-  Obtiene un arreglo de objetos, donde cada objeto es una oferta con toda su información.
-  No requiere parametros.

#### **📍 GET | /localhost:3001/api/offer/:id**
Consulta una oferta especifica existentes en la base de datos.
- Obtiene un objeto, donde es una oferta con toda su información.
- Parametros necesarios: UUID de la oferta ya creada.

#### **📍 POST | /localhost:3001/api/offer**
Crear una nueva oferta en la base de datos.
- Parametros necesarios: un json de la siguiente estructura
```JSON
    {
        "title": "Offer 1",
        "description": "Detalles de la oferta de alquiler",
        "category": "rent",
        "price": 1500,
        "expiration": "2023-12-31",
        "stateOffer": "active",
        "opportunityId": "adb94e2f-a7ac-482e-ab5e-4b3dccdce3fa"
    }
```
- opportunityId: debe recibir el id de la opportunidad a la que se va a asociar esta oferta.

#### **📍 UPDATE | /localhost:3001/api/offer/:id**
Actualizar una oferta existente en la base de datos.
- Parametros necesarios: un json de la siguiente estructura
```JSON
    {
        "title": "Offer 1",
        "description": "Detalles de la oferta de alquiler",
        "category": "rent",
        "price": 1500,
        "expiration": "2023-12-31",
    }
```
- En este caso solo podremos modificar estos campos. El estado de la oferta "stateOffer",se puede modificar unicamente cuando se modifique el estado de la Oportunidad asociada.

#### **📍 GET | /localhost:3001/api/opportunities**
Consulta todas las Oportunidades existentes en la base de datos.
-  Obtiene un arreglo de objetos, donde cada objeto es una oportunidad con toda su información y ofertas asociadas.
-  No requiere parametros.

#### **📍 GET | /localhost:3001/api/opportunity/:id**
Consulta una Oportunidad especifica existentes en la base de datos.
- Obtiene un objeto, donde es una oportunidad con toda su información.
- Parametros necesarios: UUID de la oportunidad ya creada.

#### **📍 POST | /localhost:3001/api/offer**
Crear una nueva oferta en la base de datos.
- Parametros necesarios: un json de la siguiente estructura
```JSON
    {
        "nameOpportunity": "Casa en La Serena",
        "address": "Calle Los Alamos 678",
        "image": ["https://example.com/images/property7_1.jpg", "https://example.com/images/property7_2.jpg"],
        "location": "La Serena",
        "typeOfProperty": "Casa",
        "city": "La Serena",
        "details": "Casa de playa cerca del centro",
        "area": 220,
        "latitude": -29.9028,
        "length": -71.2525,
        "state": "available"
    }
```

#### **📍 UPDATE | /localhost:3001/api/opportunity/:id**
Actualizar una Oportunidad existente en la base de datos.
- Parametros necesarios: un json de la siguiente estructura
```JSON
    {
        "nameOpportunity": "Talca",
        "address": "Calle Los Olivos 654",
        "image": ["https://example.com/images/property10_1.jpg", "https://example.com/images/property10_2.jpg"],
        "location": "Talca",
        "typeOfProperty": "Casa",
        "city": "Talca",
        "details": "Casa con amplio jardín en zona tranquila",
        "area": 500,
        "latitude": -35.4236,
        "length": -71.6480,
        "state": "paused",
        "stateOffer": "active"
    }   
```
- En este caso deberiamos pasar stateOffer en el caso de que al modificar el estado de la Oportunidad tambien podemos cambiar el estado de la Oferta asociada.
