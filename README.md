# Trabajo-02-Phaser-3

Link: https://witty-grass-018670210.1.azurestaticapps.net

A continuación se mostraran los cambios que se hicieron al tutorial que debiamos modificar de Phaser 3:

Primeramente se cambiarion algunos de los assets que venian por defecto en el juego

![image](https://user-images.githubusercontent.com/97976469/153945728-31a39088-18cf-4fe4-a342-cf5406de81a5.png)

Se cambio el fondo de el cielo por una galaxia y las plataformas fueron cambiadas a color morado.

Estos cambios se ven reflejados en el código de la siguiente manera:

![image](https://user-images.githubusercontent.com/97976469/153945788-e43c96a3-ba4b-46e1-ace3-5bedcf2e81fc.png)


Y en el juego:

![image](https://user-images.githubusercontent.com/97976469/153945838-b14f7f1c-8723-4bd7-a144-8a67b4d5b7ef.png)

Otro cambio grande que se realizó fue la forma en la que se utiliza el input del usuario para hacer mover el personaje del juego,
antes se utilizaban las flechas del teclado, esto fue modificado y cambiado para que el personaje del juego siguiera el cursor
del mouse que utiliza el usuario como se pedía en las especificaciones del trabajo.

El código para lograr esto es el siguiente:

![image](https://user-images.githubusercontent.com/97976469/153946033-238fa090-db9c-4eb4-9ec5-d5e5e4da8d54.png)

Estas son las variables que se necesitan para que el personaje tenga una velocidad, angulos de rotación y velocidad de rotación.

![image](https://user-images.githubusercontent.com/97976469/153946134-4d70728d-c9ee-4890-af67-f1e88151d1c8.png)

En la función update se manda llamar la función pointerMove la cual manda el puntero del mouse para tenerla de referencia para mover al personaje a esa posición, despues
cambia la velocidad del personaje.

![image](https://user-images.githubusercontent.com/97976469/153946338-ba8bb06a-9a64-41b0-a19d-4508b62d7850.png)

Por ultimo la función pointerMove se ve como anteriormente, esta función toma las posiciones del personaje comparandolas con la del puntero del mouse y hace que el
personaje se acerque al puntero tomando en cuenta su angulo y velocidad.

Otro cambio que se realizó al juego, fue cambiar la velocidad de las bombas ya que iban muy lento y no suponian un desafio.

![image](https://user-images.githubusercontent.com/97976469/153946553-c25d31bf-a366-4ea8-8e17-25d0b6ef5602.png)

Por ultimo se cambio el color de la palabra "score" de negro a blanco

![image](https://user-images.githubusercontent.com/97976469/153946608-2cf03244-14c6-4419-ad3b-2309d1962d08.png)


SS del juego:

![image](https://user-images.githubusercontent.com/97976469/153946655-9f1e1f49-44d1-4508-9a09-2ff4881e17a9.png)

![image](https://user-images.githubusercontent.com/97976469/153946685-8b31929e-c863-41be-8228-5ad0434458c2.png)
