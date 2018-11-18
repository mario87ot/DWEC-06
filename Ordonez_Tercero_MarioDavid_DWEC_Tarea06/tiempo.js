//Mi appid
var appid = "23ea84f281cc4b7600d4782362390544";

/***************************************
 *                                     *
 *        ASIGNACIÓN DE EVENTOS        *
 *                                     *
 ***************************************/
$(document).ready(function () {
    //Al clicar en el botón "Previsión de hoy", mostramos los datos del tiempo de hoy
    $("#hoy").click(tiempoActual);

    //Al clicar en el botón "Previsión de 4 días", mostramos los datos de del tiempo de los próximos 4 días
    $("#cuatrodias").click(tiempoCuatroDias);
});


/***************************************
 *                                     *
 *             FUNCIONES               *
 *                                     *
 ***************************************/

/**
 * Función que hace una llamada mediante ajax a la api de openweathermap para mostrar los datos
 *  de la previsión de los próximos 4 días de la ciudad española introducida en el formulario
 */
function tiempoCuatroDias() {
    //Guardamos el nombre de la ciudad introducida en el formulario
    var ciudad = $("#ciudad").val();
    //Si no se ha dejado en blanco el campo ciudad
    if (ciudad != "") {
        //Hacemos la llamada mediante ajax
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + ciudad + ",es&units=metric&APPID=" + appid,
            type: "GET",
            dataType: "json",
            beforeSend: function () {
                //Mostramos el gif de carga
                $("#datosPrevision").html("<img src='img/loader.gif'/>");
                //Deshabilitamos el botón y cambiamos el texto a Un momento...
                $("#cuatrodias").attr("disabled", true);
                $("#cuatrodias").prop("value", "Un momento...");
            },

            success: function (data) {
                //Limpiamos el div error por si se estuviera mostrando algún error anterior
                $("#error").html("");
                //Limpiamos el div donde se muestran los datos del tiempo, por si se estuviera mostrando algo de alguna consulta anterior
                $("#datosPrevision").html("");
                //Recorremos el array list del json devuelto por la api
                var cuentaDias=1;
                for (var i = 0; i < data.list.length; i++) {
                    var diaPrevision=data.list[i].dt_txt.substr(8,2);
                    //Guardamos la primera fecha que aparece en el array list del json, es decir, la fecha del día en el que estamos
                    /*var fexa = new Date(data.list[0].dt_txt.substring(0, 4), data.list[0].dt_txt.substring(5, 7) - 1, data.list[0].dt_txt.substring(8, 10), data.list[0].dt_txt.substring(11, 13), data.list[0].dt_txt.substring(14, 16), data.list[0].dt_txt.substring(17, 19), 0);*/
                    var fechaHoy=new Date();
                    var hoy=fechaHoy.getDate();
                    
                    //Si el día de la fecha es distinta a la de hoy (esto es para controlar que no muestre la previsión del día de hoy, sino que empiece a mostrar a partir del día de mañana)
                    if (diaPrevision != hoy && cuentaDias<=8) {
                        
                        //Si la hora es las 12 del mediodía
                        if (data.list[i].dt_txt.substring(11, 19) == "12:00:00") {
                            cuentaDias++;
                            //Guardamos la fecha
                            var fecha = data.list[i].dt_txt;
                            var dia = fecha.substring(8, 10);
                            var mes = fecha.substring(5, 7);
                            var ano = fecha.substring(0, 4);
                            var hora = fecha.substring(11, 19);
                            //Construimos la fecha para mostrarla en formato DD/MM/YYYY en vez de YYYY/MM/DD
                            var fechaAux = dia + "/" + mes + "/" + ano + " " + hora;
                            //Guardamos los datos a mostrar
                            var tempNoche = data.list[i].main.temp;
                            var vientoNoche = data.list[i].wind.speed;
                            var direccionVientoNoche = data.list[i].wind.deg;
                            var iconoNoche = data.list[i].weather[0].icon;
                            //Mostramos los datos en el div datosPrevision
                            $("#datosPrevision").append("<h2>" + fechaAux + "</h2>Temperatura: " + tempNoche + "&deg;C<br>Velocidad del viento: " + vientoNoche + "m/s<br>Dirección del viento: " + direccionVientoNoche + "&deg;<br>" + "<img src=http://openweathermap.org/img/w/" + iconoNoche + ".png><br>");
                        }

                        //Si la hora es las 21 de la noche
                        if (data.list[i].dt_txt.substring(11, 19) == "21:00:00") {
                            cuentaDias++;
                            var fecha = data.list[i].dt_txt;
                            var hora = fecha.substring(11, 19);
                            var fechaAux = dia + "/" + mes + "/" + ano + " " + hora;
                            var tempDia = data.list[i].main.temp;
                            var vientoDia = data.list[i].wind.speed;
                            var direccionVientoDia = data.list[i].wind.deg;
                            var iconoDia = data.list[i].weather[0].icon;
                            $("#datosPrevision").append("<h2>" + fechaAux + "</h2>Temperatura: " + tempDia + "&deg;C<br>Velocidad del viento: " + vientoDia + "m/s<br>Dirección del viento: " + direccionVientoDia + "&deg;<br>" + "<img src=http://openweathermap.org/img/w/" + iconoDia + ".png><br>------------------------------------------");
                        }
                    }

                }
                console.log(data);
            },

            error: function () {
                $("#datosPrevision").html("<p style=color:red>*Ha ocurrido un error, revise los datos</p>");
            },

            complete: function () {
                $("#cuatrodias").attr("disabled", false);
                $("#cuatrodias").prop("value", "Previsión de 4 días");

            }
        });
        //Si no se ha introducido nada en el campo ciudad, mostramos un mensaje de error
    } else {
        $("#datosPrevision").html("<p class='rojo'>*Introduce una ciudad, por favor</p>");
    }
};


/**
 * Función que hace una llamada mediante ajax a la api de openweathermap para mostrar 
 * los datos de la previsión del tiempo actual de la ciudad española introducida en el formulario
 */
function tiempoActual() {
    var ciudad = $("#ciudad").val();
    if (ciudad != "") {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + ",es&units=metric&APPID=" + appid,
            type: "GET",
            dataType: "json",
            beforeSend: function () {
                $("#datosPrevision").html("<img src='img/loader.gif'/>");
                $("#hoy").attr("disabled", true);
                $("#hoy").prop("value", "Un momento...");
            },

            success: function (data) {
                $("#error").html("");
                $("#datosPrevision").html("<p>Temperatura: " + data.main.temp + "&deg;C</p>" + "<p>Velocidad del viento: " + data.wind.speed + "m/s</p>" + "<p>Dirección del viento: " + data.wind.deg + "&deg;</p>" + "<p><img src=http://openweathermap.org/img/w/" + data.weather[0].icon + ".png></p>");
                console.log(data);
            },

            error: function () {
                $("#datosPrevision").html("<p style=color:red>*Ha ocurrido un error, revise los datos</p>");
            },

            complete: function () {
                $("#hoy").attr("disabled", false);
                $("#hoy").prop("value", "Previsión de hoy");
            },
        });
    } else {
        $("#datosPrevision").html("<p class='rojo'>*Introduce una ciudad, por favor</p>");
    }
};
