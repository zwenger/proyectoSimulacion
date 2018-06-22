var cp = 0;
var poblacion = [];
var cantHabitantes = 5489;
var consumoTotal = 0;
var capMax = 3000000; // Capacidad maxima del dique en m³
var capActual = capMax;
var consumoMinXPersona = 0.6; // Consumo minimo x persona en m³
var consumoMaxXPersona = 0.8; // Consumo maximo x persona en m³
var caudalDiario = 0; // Caudal diario simulado en m³/dia
var caudal = 69120; // Caudal promedio en m³/dia
var desviacionCaudal = 17280; // Desviacion del caudal promedio
var dia = 0;
var diaFinal = 0; // Dia del juicio final :|
var año = 2018; // Contiene el año del juicio final
var añoFinal = 1 ;
var nacimientos = 0;
var muertes = 0;
var tuplaDique = [['Año','Nivel']] ;
var tuplaPob = [['Año','Poblacion']] ;


darVida(cantHabitantes);

while (cp == 0) {
    while (dia < 365) {//Inicio simulacion de 1 año dia x dia
        for (let i = 0; i < poblacion.length; i++) {
            var consumo = uniforme(consumoMinXPersona,consumoMaxXPersona) ;
            consumoTotal = consumoTotal + consumo;
        }
       // console.log(consumoTotal);
    
        caudalDiario = normal(caudal,desviacionCaudal);

        if (Math.random()<= 0.6) {
            
        } else {
            caudalDiario = 0;
        }
        
        capActual = capActual + caudalDiario - consumoTotal; // Nivel del dique
        //console.log(caudalDiario);
        //console.log(consumoTotal);
    
        if (capActual > capMax) {   
            capActual = capMax;    // Si rebalsa el dique se abren las compuertas
            //console.log("rebalso");
        }
        if (capActual > consumoTotal) { //Si el dia del juicio no llega, simula otro dia
            dia = dia + 1;  
        } else {        // Si ese dia llega sale emigrar a Noruega            
            cp = 1;
            diaFinal = dia;
            dia = 365;
            añoFinal = año;
        }
        
        consumoTotal = 0;
        //Cuanta gente nacio este año?
        nacimientos = nacimientos + poisson(2);
        //Cuantos murieron este año?
        muertes = muertes + poisson(1.5);
        

    }// Fin de la simulacion del Año dia x dia 
    datosGraficoDique(año,capActual);
    datosGraficoPob(año,poblacion.length);
    console.log(año);
    console.log(poblacion.length);
    console.log(capActual);
    
    dia = 0;
    año = año + 1;
    
    //Las personas mueren :(
    eliminarPersonas(muertes);
    // Y nacen ! :D
    agregarPersonas(nacimientos);
    
    cumpleaños(poblacion);
    muerteNatural(poblacion);

}//Fin del while de la condicion de parada cp

console.log(añoFinal,diaFinal);
drawChart();
drawChartPob();

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
function poisson(alfa) {
    var x = 0;
    var b = Math.exp(-alfa);
    var p = 1;
    while (p > b){
    p = p * Math.random();
    x = x + 1;
    }
    return x;
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
            array.splice(i,1); // Si tiene mas de 75 años 
        }                                     // mato a ese y a los siguientes
    }                                         // xq el array esta ordenado
}   

function darVida(cantHabitantes){
    for (let index = 0; index < cantHabitantes; index++) {
        poblacion.unshift(35);
    }

}



function datosGraficoDique(año,capActual){
    var arrayComponente = [] ;    

    arrayComponente.push(año);
    arrayComponente.push(capActual);

   tuplaDique.push(arrayComponente);
   
}

function datosGraficoPob(año,pob){
    var arrayComponente2 = [] ;    

    arrayComponente2.push(año);
    arrayComponente2.push(pob);

   tuplaPob.push(arrayComponente2);
   
}