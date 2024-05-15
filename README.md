# AESA

### Instalación
1. Subir la carpeta `aesa` al directorio `/wp-content/plugins/` de tu instalación de WordPress.
2. Activar el plugin desde el menú de plugins de WordPress.
3. Configurar WordPress para aceptar tamaños de archivo mayores a 2MB para la carga de anuarios ver ANEXO 1 al final de este documento.


### ANEXOS
### 1. Configurar tamaño máximo de carga de archivo

Incluir el siguiente código al final del archivo .htaccess en la raíz de tu instalación de WordPress.

```apache
# BEGIN AESA Config
php_value upload_max_filesize 50M
php_value post_max_size 50M
php_value max_execution_time 300
php_value max_input_time 300
# END AESA Config
```
