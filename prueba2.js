var poblacion = [1,2,1,75,75,5,75];

poblacion.sort();

for (let i = 0; i < poblacion.length; i++) {
    var edad  = poblacion[i];
    poblacion[i] = edad + 1 ;

}

for (let i = 0; i < poblacion.length; i++) {
    var edad  = poblacion[i];
    if (edad <= 75) {

    }else{
        poblacion.splice(i,poblacion.length - i);
    }
    console.log(poblacion);
}

