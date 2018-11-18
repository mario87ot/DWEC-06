# DWEC-06
Tarea 6 Desarrollo Web en Entorno Cliente

El tiempo.
Lo primero de todo no os asustéis. Tenéis más de un mes para realizar la tarea y es realmente fácil.  El código completo con HTML  y el JavaScript me ocupa 125 líneas o así.  Pero entiendo que pueda pareceros un poco complejo de primeras (aunque confío en que no os va a costar nada).
¿Qué se va a a realizar? Pues vamos a hacer una aplicación web que permita saber el tiempo actual en cualquier zona de España.  Vamos a utilizar jQuery y JSON, para mostrar el tiempo en la actualidad y en un periodo en el futuro.
¿Cómo lo vamos a implementar? Pues en un solo archivo html y con un sólo js.
¿Cómo se realiza una llamada para obtener un JSON de ciudad de un país? Pues realizas una llamada a AJAX con GET y JSON con la API gratuita del tiempo OpenWeather:
 http://openweathermap.org/api
 ¿Ventajas? Pues no tenemos que crear nada con PHP. Se simplifica la  tarea y además podemos hacer algo muy chulo porque el tiempo es verdadero. 
 Esta API Rest te puede devolver XML, JSON, HTML, etc. Se pueden obtener datos como los siguientes. 
- La temperatura(main -> temp)
- Humedad (main -> humidity),
- Velocidad del viento,
- El tipo de tiempo (weather -> main),
- La nubosidad (clouds),
- La lluvia (rain). Si llueve con un si o no.
- El icono (weather - > icon). Este icono simplifica la comprensión de los datos ofrecidos.
- La longitud y latitud del lugar que estamos buscando.  
¿Qué tenéis que hacer?
Se van a mostrar en una página dos botones, uno para el día de hoy y otro para mostrar una previsión de 4 días.  Además un campo de texto que permita introducir la ciudad  En ambos casos debe mostrar se esta información:
- Temperaturas del día y de la noche. Si es el tiempo del momento no es necesario .
- Viento. Si no hay viento este dato no es visible. 
- Icono con la previsión. O sea que debe aparecer el típico icono que llueve, o está soleado o ventoso. 
- Los resultados se obtendrán en formato JSON.
Ahora bien, si queréis sumar más puntuación del 10, tal y como hicimos en la tarea anterior, y será como mucho 1 punto. Podéis elegir voluntariamente alguna de estas opciones:
- Mostrar un mapa la localidad que estamos buscando. Para ello podéis usar openStreetMaps que estáis usando para DWES, o si queréis Google Maps, pero no es libre.  Esta tarea os dará 0,5 puntos más. 
- Usar el mapa anterior para que cuando pulsemos una ciudad en el mapa aparezca el tiempo de ese lugar. 0,5 puntos extra.
- Obtener los datos con XML (0,5 puntos)
- Obtener los datos JSON sin jQuery (0,5 puntos)
El porqué de esta subida de puntuación es para equilibrar los errores tontos que tuvisteis en las primeras tareas por falta de experiencia. 
Observaciones:
- jQuery es necesario para la práctica. Ya verás como te soluciona la vida. Aunque está prohibido utilizar plugins que te traduzcan directamente del API del tiempo.
- Para obtener el valor de un input del formulario con id="localidad" se puede utilizar, por ejemplo, $("#localidad").val() que te devuelve el valor actual (no el predefinido) de ese campo.
- Si creas una función para gestionar un evento en jQuery puede llevar un parámetro evento (es opcional) pero muy interesante para abortar la propagación del evento. Podrías usar por ejemplo:
      $("button").click(function (evt) {
      //// Código
      evt.preventDefault();
      });
- Para cambiar el css con jQuery podéis utilizar:
      $('#elemento').css('propiedad-css', 'valor a asignar');
- Los datos solicitados al servidor estarán en Weather API  https://openweathermap.org
