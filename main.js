var cp = 0; // Bandera que se activa al quedarse sin agua el dique
var poblacion = []; // Array donde se guardan las edades de los habitantes
var cantHabitantes = 0; // Cantidad de habitantes en la region 548.866 segun censo
var consumoTotal = 0; // Consumo total diario de la region expresado en m^3
var capMax = 0; // Capacidad maxima del dique en m³ 300.000.000
var capActual = capMax; // Nivel actual del dique expresado en m^3
var consumoMinXPersona = 0; // Consumo minimo diario x persona en m³ 0.6
var consumoMaxXPersona = 0; // Consumo maximo diario x persona en m³ 0.8
var caudalDiario = 0; // Caudal diario simulado en m³/dia
var caudal = 0; // Caudal promedio en m³/dia 6.912.000
var desviacionCaudal = 0; // Desviacion del caudal promedio 1.728.000
var dia = 0; // Dia de simulacion
var diaFinal = 0; // Dia del juicio final :|
var año = 2018; // Año de inicio de la simulacion
var añoFinal = 1 ; // Contiene el año del juicio final
var nacimientos = 0; // Acumulador de nacimientos por año
var muertes = 0; // Acumulador de muertes por año
var tuplaDique = [['Año','Nivel [Litros]']] ; // Variable utilizada para graficar 
var tuplaPob = [['Año','Poblacion']] ; // Variable utilizada para graficar 
var nacAño = 0; // Nacimientos por año en la region 104.284
var mueAño = 0; // Muertes por año en la region 37.322
var i = 0;


function main() {
    

    darVida(cantHabitantes);

    while (cp == 0) {
        while (dia < 365) { //Inicio simulacion de 1 año dia x dia
        for (let i = 0; i < poblacion.length; i++) {
            var consumo = uniforme(consumoMinXPersona,consumoMaxXPersona) ;
            consumoTotal = consumoTotal + consumo;
        }
       
    
        caudalDiario = normal(caudal,desviacionCaudal); // Simulacion normal del caudal diario del dique
        
        capActual = capActual + caudalDiario - consumoTotal; // Nivel del dique
        
    
        if (capActual > capMax) {   
            capActual = capMax;    // Si rebalsa el dique se abren las compuertas
            
        }
        if (capActual > consumoTotal) { //Si el dia del juicio no llega, simula otro dia
            dia = dia + 1;  
        } else {        // Si ese dia llega nos quedamos sin agua          
            cp = 1;
            diaFinal = dia;
            dia = 365;
            añoFinal = año;
        }
        
        
        consumoTotal = 0;
        //Cuanta gente nacio este año?
        nacimientos = nacimientos + poisson(Math.trunc(nacAño));
        //Cuantos murieron este año?
        muertes = muertes + poisson(Math.trunc(mueAño));
        

    }// Fin de la simulacion del Año dia x dia 
    datosGraficoDique(año,capActual*100);
    datosGraficoPob(año,poblacion.length*100);
    console.log(año);
    console.log(poblacion.length);
    console.log(capActual);
    
    dia = 0;
    año = año + 1;
    
    //Las personas mueren 
    eliminarPersonas(muertes);
    // Y nacen 
    agregarPersonas(nacimientos);
    
    cumpleaños(poblacion);
    muerteNatural(poblacion);

    }//Fin del while de la condicion de parada cp
    console.log(añoFinal,diaFinal);
    drawChart();
    drawChartPob();

}




//Simula y devuelve un valor que sigue una distribucion normal
function normal(media,desviacion) {
    var resultado = 0;
    var suma = 0;
    for (let index = 0; index < 12; index++) {
        suma = suma + Math.random();  //Math.random()
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
    p = p * Math.random(); //Math.random()
    x = x + 1;
    }
    return x;
}
//simula y devuelve un valor que sigue una distribucion uniforme
function uniforme(min,max) {
    var resultado = 0;
    resultado = min + ((max - min) * Math.random()); //Math.random()
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
//Carga el array de poblacion con las edades iniciales
function darVida(cantHabitantes){
    for (let index = 0; index < cantHabitantes; index++) {
        poblacion.unshift(35);
    }

}

//Trunca los numeros enormes devueltos por el reloj del cpu
function truncarNumeros(numero, inicio, fin){
    var string = String(numero).substring(inicio, (inicio+fin));
    return string;
  }

//Elige la semilla para el metodo congruencial con el reloj del procesador y la adecua para que cualquier
// entero para no divisible entre 5  
function elegirSemilla(){
    var probSemilla = Date.now();
    probSemilla = truncarNumeros(probSemilla, 7, 13);
    while(probSemilla % 2 == 0 || probSemilla % 5 == 0){
      probSemilla = 2*(probSemilla^2) - 1;
    }
    return probSemilla;
  }

//Metodo congruencial multiplicativo
function conguencial(){
    var a, no, n, m;
    
    a = 5631; // Constante
    no = elegirSemilla(); // Semilla
    m = 547; // Modulo 
      n = (a*no) % m;
      no = n;
      x = n/m;
    return x;
  }
  
function datosGraficoDique(año,capActual){
    var arrayComponente = [] ; 
    i = i + 1;   

    arrayComponente.push(año);
    arrayComponente.push((capActual));

   tuplaDique.push(arrayComponente);
   
}

function datosGraficoPob(año,pob){
    var arrayComponente2 = [] ;    

    arrayComponente2.push(año);
    arrayComponente2.push(pob);

   tuplaPob.push(arrayComponente2);
   
}
  
  
  
  function getData() {
    cantHabitantes = document.getElementById("cantHabitantes").value / 100;
    nacAño = document.getElementById("nacAño").value / 36500;
    mueAño = document.getElementById("mueAño").value / 36500;
    capMax = document.getElementById("capMax").value / 100;
    capActual = capMax;
    consumoMinXPersona = document.getElementById("consumoMinXPersona").value / 1000;
    consumoMaxXPersona = document.getElementById("consumoMaxXPersona").value / 1000;
    caudal = document.getElementById("caudal").value / 100;
    desviacionCaudal = document.getElementById("desviacionCaudal").value / 100;
    //console.log(cantHabitantes,nacAño,mueAño,capMax,consumoMinXPersona,consumoMaxXPersona,caudal,desviacionCaudal)
   main();
}