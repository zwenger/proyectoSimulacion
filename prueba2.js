var media = 80;
var desv = 20;
var suma = 0;
for (let index = 0; index < 12; index++) {
     suma = suma + Math.random();

    var x = desv * ( suma - 6 ) + media
    
}

console.log(x);