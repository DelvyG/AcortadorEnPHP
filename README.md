# Acortador de URL Básico

Este es un acortador de URL simple y funcional, ideal para generar enlaces acortados que puedes compartir fácilmente.

## Características

*   **Generación de Enlaces Acortados:** Crea enlaces cortos a partir de URLs largas.
*   **Base de Datos MySQL:** Almacena las URLs acortadas y originales en una base de datos MySQL.
*   **Integración con reCAPTCHA (Opcional):** Puedes integrar reCAPTCHA de Google para proteger el acortador de spam (requiere configuración con tu API key).
*   **Personalizable:** Fácil de personalizar el logo.
*   **Fácil de Implementar:** Sube los archivos a tu servidor y configura la base de datos.
*   **Requiere Dominio Corto:**  Para una mejor experiencia, se recomienda utilizar un dominio corto dedicado.

## Requisitos

*   Servidor web con soporte para PHP.
*   Base de datos MySQL.
*   (Opcional) Cuenta de Google reCAPTCHA para obtener las API keys.

## Instalación

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
    (Reemplaza `<URL_DEL_REPOSITORIO>` con la URL de tu repositorio en GitHub).

2.  **Subir los archivos al servidor:** Sube todos los archivos del proyecto a tu servidor web (normalmente a la carpeta `public_html` o la carpeta correspondiente a tu dominio).

3.  **Crear la base de datos MySQL:**

    *   Crea una nueva base de datos en tu servidor MySQL.
    *   Importa el archivo `database.sql` (o crea manualmente la tabla) para crear la estructura necesaria:

        ```sql
        CREATE TABLE `urls` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `url_original` varchar(255) NOT NULL,
          `url_acortada` varchar(50) NOT NULL,
          `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        ```

4.  **Configurar la conexión a la base de datos:**

    *   Abre el archivo `config.php` (o el archivo donde tengas la configuración de la base de datos).
    *   Modifica las siguientes variables con la información de tu base de datos:

        ```php
        <?php
        define('DB_HOST', 'localhost');      // Cambia a la dirección de tu servidor MySQL
        define('DB_USER', 'usuario_db');      // Cambia al usuario de tu base de datos
        define('DB_PASS', 'contraseña_db');   // Cambia a la contraseña de tu base de datos
        define('DB_NAME', 'nombre_db');      // Cambia al nombre de tu base de datos
        ?>
        ```

5.  **(Opcional) Configurar reCAPTCHA:**

    *   Si deseas utilizar reCAPTCHA, obtén las API keys (Site Key y Secret Key) desde la consola de Google reCAPTCHA: [https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)
    *   Abre el archivo `config.php` (o el archivo donde tengas la configuración) y define las constantes para las API keys:

        ```php
        define('RECAPTCHA_SITE_KEY', 'TU_SITE_KEY');
        define('RECAPTCHA_SECRET_KEY', 'TU_SECRET_KEY');
        define('USAR_RECAPTCHA', true); // Cambiar a true para habilitar reCAPTCHA, false para desactivar
        ```

6.  **Personalizar el logo:**

    *   Reemplaza el archivo de imagen del logo (normalmente `logo.png` o similar) con tu propio logo.  Asegúrate de mantener el mismo nombre de archivo (o modifica la referencia en el código HTML/CSS).

7.  **Dominio Corto:**

    *   Para aprovechar al máximo el acortador, configura un dominio corto (por ejemplo, `ejem.pl`) y apunta el dominio a la carpeta donde subiste los archivos del acortador.

## Uso

1.  Abre tu acortador en el navegador (por ejemplo, `http://tu-dominio.com/` o `http://tu-dominio-corto.com/`).
2.  Ingresa la URL larga que deseas acortar.
3.  (Si está habilitado reCAPTCHA) Completa el desafío de reCAPTCHA.
4.  Haz clic en el botón "Acortar".
5.  Copia la URL acortada generada.

## Próximas Funcionalidades (Roadmap)

*   Dashboard para gestionar, editar y borrar URLs acortadas.
*   Estadísticas de clics para cada URL.
*   Posibilidad de personalizar la URL acortada.
*   API para la creación programática de URLs acortadas.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún error o tienes alguna sugerencia, por favor, crea un "issue" o envía un "pull request".

