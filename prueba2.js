var cantHabitantes = 100000 ;
var poblacion = [];
function darVida(cantHabitantes){
    for (let index = 0; index < cantHabitantes; index++) {
        poblacion.unshift(35);
    }

}

darVida(cantHabitantes)
console.log(cantHabitantes);
console.log(poblacion);