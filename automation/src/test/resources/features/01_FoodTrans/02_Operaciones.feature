# language: es

Característica: Operaciones principales de FoodTrans
  Como administrador o cliente
  Quiero utilizar los flujos principales de FoodTrans
  Para gestionar cuentas, movimientos y viajes

  @admin
  Escenario: El administrador inicia sesión y consulta el panel
    Dado que se abre FoodTrans
    Cuando el administrador inicia sesión
    Entonces se muestra el panel de administración

  @admin
  Escenario: El administrador crea una cuenta de cliente
    Dado que se abre FoodTrans
    Cuando el administrador inicia sesión
    Cuando crea una cuenta de cliente de prueba
    Entonces la cuenta nueva aparece en la tabla de clientes

  @cliente
  Escenario: El cliente radica un movimiento y lo consulta en el calendario
    Dado que se abre FoodTrans
    Cuando el cliente inicia sesión
    Cuando radica un movimiento de prueba para hoy
    Cuando abre el calendario de viajes
    Entonces el movimiento aparece en el día seleccionado

  @admin
  Escenario: El administrador abre el calendario de viajes
    Dado que se abre FoodTrans
    Cuando el administrador inicia sesión
    Cuando abre el calendario de viajes
    Entonces se muestra el calendario de administración
