Ingenier�a de Aplicaciones Web
Proyecto 1

Comisi�n 703:
	Andr�s Mart�nez, 99268
	Marina Razuc, 99221

Se decidi� desarrollar una p�gina que le permita al usuario personalizar un desayuno.
Al acceder a la p�gina, el usuario podr� encontrarse un panel vac�o, en donde se mostrar�n los productos que ir�n conformando el desayuno. Tambi�n podr� apreciarse 
otro panel con las siguientes categor�as: Bebidas, Frutas, Dulces, Panader�a y Confiter�a, Taza, y Bandeja, y los productos disponibles por cada una de ellas.
Al principio la intenci�n era que el usuario pueda seleccionar distintas cantidades de cada producto disponible, pero por recomendaci�n de la c�tedra y para no 
aumentar la complejidad de la p�gina, se decidi� permitir como m�ximo un producto de los disponibles en el desayuno.
De cada categor�a el usuario podr� elegir todas las opciones disponibles, excepto en las categor�as Taza y Bandeja, donde s�lo podr� elegirse un producto como 
m�ximo. 
Por defecto, la p�gina muestra el desayuno personalizado y vac�o, pero el usuario tendr� la posibilidad de cargar desayunos predefinidos, en este caso, el Cl�sico, 
el Especial, y el Matero. Al seleccionar alguno de estos, en el panel vac�o aparecer�n todos los productos asociados a ese desayuno. Si el usuario quiere agregar, 
quitar o cambiar alg�n producto perteneciente al mismo, la p�gina cambiar� directamente a la opci�n de desayuno personalizado, y se reflejar�n los cambios realizados
por el usuario en el panel donde se representa el desayuno.
Mientras el usuario elige o descarta productos del desayuno, tambi�n podr� observarse el cambio en el precio total del mismo.
El usuario puede guardar la configuraci�n de un desayuno predeterminado (bot�n azul), y al revisitar la p�gina en otra ocasi�n, puede recuperar dicha configuraci�n (bot�n verde). El usuario adem�s podr� borrar todo el panel conteniendo el desayuno si lo desea con un s�lo click (bot�n rojo), y tambi�n podr� simular la opci�n de comprar
el desayuno (bot�n violeta), mostrando una lista con cada producto elegido y su precio.
La p�gina tiene dos apariencias o estilos distintos disponibles, los cuales son persistentes, es decir, si el usuario cierra la p�gina con el estilo A presente, al
volver a cargar la p�gina, tendr� ese mismo estilo. Los mismos pueden cambiarse clickeando el bot�n de colores situado en la esquina inferior derecha de la p�gina.


El panel conteniendo los productos del desayuno en cuesti�n fue implementado con un canvas, espec�ficamente, el Kinetic canvas, que result� ser el de m�s utilidad 
al momento de trabajar. Se crea un escenario cuyo contenido es el panel, y se crea un canvas  de ancho y alto del panel. Para "pintar" el canvas se utiliz� un esquema de capas, es decir, una capa por imagen, para facilitar el mostrar u ocultar una imagen seg�n el producto asociado se elige o se deselecciona. La capa perteneciente a la imagen de la bandeja se lleva hacia atr�s, para que no tape a ninguno de los dem�s productos. As�, se facilita el trabajo cuando el usuario decide borrar todos los productos del desayuno actual: se eliminan todas las capas del canvas. 
Las categor�as de los diferentes productos del desayuno y dichos productos fueron almacenados como esquemas de JSON. Adem�s est�n almacenadas las propiedades de cada producto, como su nombre, su categor�a, su precio, la ruta de su imagen y otras caracter�sticas necesarias al momento de pintar la imagen en el canvas.
Para implementar el panel de configuraci�n del desayuno se utiliz� una tabla, la cual se crea din�micamente, teniendo en cuenta las categor�as y productos presentes en el esquema JSON. En un primer momento se hab�a implementado un "drag and drop" para que el usuario pueda arrastar los productos desde la tabla hacia el canvas, pero en un principio, se permit�a poner m�s de una unidad por producto en el desayuno, y eso no era lo buscado, y en otra soluci�n, una vez puesto el producto en el canvas, desaparec�a de la tabla, y no quedaba muy est�tico. Entonces se decidi� utlizar celdas con checkboxes, excepto en las categor�as Taza y Bandeja, donde se utilizaron celdas con radio buttons, ya que, como se mencion� anteriormente, se puede seleccionar como m�ximo un producto de esas categor�as.
Para guardar el estilo elegido por el usuario se utiliza LocalStorage. Tambi�n se utiliz� para guardar la configuraci�n del desayuno armado, si es que el usuario lo requiere.

Se utilizaron librer�as de bootstrap, jquery, javascript
Bootstrap: bootstrap.min.css, bootstrap.min.js, facebox-bootstrap.js, 
JQuery: jquery-ui.css, jquery.min.js, jquery-ui.js, 
Javascript: kinetic-v5.1.0.min.js, 


Bugs conocidos:
Se not� que la carga del canvas presenta algunos problemas cuando se abre la ventana de inspecci�n. A veces sucede que al abrir dicha ventana y seguir modificando el desayuno, los cambios se reflejan con cierta demora, incluso hay casos en los que es necesario seguir clickeando otros productos para que los cambios se vean.


F12