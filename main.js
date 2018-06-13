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
    while (dia < 365) {//Inicio simulacion de 1 año dia x dia
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
    nacimientos = poisson(11547);//corregir
    //Cuantos murieron este año?
    muertes = poisson(4419);//corregir
    //Las personas mueren :(
    eliminarPersonas(muertes);
    // Y nacen ! :D
    agregarPersonas(nacimientos);
    
    cumpleaños(poblacion);
    muerteNatural(poblacion);

}//Fin del while de la condicion de parada cp

//Simula y devuelve un valor que sigue una distribucion normal
function normal(media,desviacion) {
    var resultado = 0;
    var suma = 0;
    for (let index = 0; index < 12; index++) {
        suma = suma + Math.random();
    }
    resultado = desviacion * ( suma - 6 ) + media
    return resultado;
}
//Simula y devuelve un valor que sigue una distribucion de poisson
function poisson(valor) {
    var resultado = 0
    //escribir simulacion poisson
    return resultado;
}
//simula y devuelve un valor que sigue una distribucion uniforme
function uniforme(min,max) {
    var resultado = 0;
    resultado = min + ((max - min) * Math.random());
    return resultado;
}
//Elimina del array las personas que murieron ese año
function eliminarPersonas(muertes) {
    // funcion que elimina personas
    for (let index = 0; index < Math.trunc(muertes); index++) {
        poblacion.splice(Math.trunc(Math.random()*poblacion.length),1);
    }
}
//Agrega al array las personas que nacieron ese año
function agregarPersonas(nacimientos) {
    //escribir funcion que agrega personas
    for (let index = 0; index < Math.trunc(nacimientos); index++) {
        poblacion.unshift(1);
        
    }
}
// Suma 1 año a cada persona del array
function cumpleaños(array){
    //ordeno el array de menor a mayor
    array.sort();

    for (let i = 0; i < array.length; i++) {
    var edad  = array[i];
    array[i] = edad + 1 ; //Sumo 1 año a cada elemento del array
    }
}
//muerte natural elimina a las personas con mas de 75 años
function muerteNatural(array){
    for (let i = 0; i < array.length; i++) {
        var edad  = array[i];
        if (edad <= 75) { 
    
        }else{
            array.splice(i,array.length - i); // Si tiene mas de 75 años 
        }                                     // mato a ese y a los siguientes
    }                                         // xq el array esta ordenado
}   
