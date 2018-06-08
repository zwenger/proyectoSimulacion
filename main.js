var cp = 0;
var poblacion = [1,1,1,1,1,1,1];
var consumoTotal = 0;
var capMax = 300000000; // Capacidad maxima del dique en m³
var capActual = capMax;
var consumoMinXPersona = 0.4; // Consumo minimo x persona en m³
var consumoMaxXPersona = 0.6; // Consumo maximo x persona en m³
var caudalDiario = 0; // Caudal diario simulado en m³/dia
var caudal = 6912000; // Caudal promedio en m³/dia
var desviacionCaudal = 172800; // Desviacion del caudal promedio
var diaFinal = 0; // Dia del juicio final :|
var año = 1; // Contiene el año del juicio final
while (cp == 0) {
    while (dia < 365) {
        for (let i = 0; i < poblacion.length; i++) {
            var consumo = uniforme(consumoMinXPersona,consumoMaxXPersona) ;
            consumoTotal = consumoTotal + consumo;
        }
    
        caudalDiario = normal(caudal,desviacionCaudal);
        
        capActual = capActual + caudalDiario - consumoTotal; // Nivel del dique
    
        if (capActual > capMax) {   
            capActual = capMax;    // Si rebalsa el dique se abren las compuertas
        }
        if (capActual > consumoTotal) { //Si el dia del juicio no llega, simula otro dia
            dia = dia + 1;  
        } else {        // Si ese dia llega sale emigrar a Noruega            
            cp = 1;
            diaFinal = dia;
            dia = 365;
            año = año - 1;
        }
        consumoTotal = 0;
    }// Fin de la simulacion del Año
    
    //Cuanta gente nacio este año?
    nacimientos = poisson(poblacion.length*1.19);
    //Cuantos murieron este año?
    muertes = poisson(poblacion.length*1.068);
    //Las personas mueren :(
    eliminarPersonas(muertes);
    // Y nacen ! :D
    agregarPersonas(nacimientos);
    
    cumpleaños(poblacion);
    muerteNatural(poblacion);
}


function normal(valor,desviacion) {
    var resultado = 0;
    //escribir simulacion normal
    return resultado;
}

function poisson(valor) {
    var resultado = 0
    //escribir simulacion poisson
    return resultado;
}

function uniforme(min,max) {
    var resultado = 0;
    resultado = min + ((max - min) * Math.random());
    return resultado;
}

function eliminarPersonas(muertes) {
    // funcion que elimina personas
    for (let index = 0; index < Math.trunc(muertes); index++) {
        poblacion.splice(Math.trunc(Math.random()*poblacion.length),1);
    }
}

function agregarPersonas(nacimientos) {
    //escribir funcion que agrega personas
}

function cumpleaños(array){
    array.sort();

    for (let i = 0; i < array.length; i++) {
    var edad  = array[i];
    array[i] = edad + 1 ;
    }
}

function muerteNatural(array){
    for (let i = 0; i < array.length; i++) {
        var edad  = array[i];
        if (edad <= 75) {
    
        }else{
            array.splice(i,array.length - i);
        }
        console.log(array);
    }
}
