var poblacion = [];

for (let index = 0; index < 10; index++) {
    var p = new persona()
    poblacion.push(p)
}
var p = new persona();
p.edad = 75
poblacion.push(p)

poblacion.forEach(persona => {
    persona.cumpleaños();
   
    if (persona.edad < 75) {
        
    } else {
        console.log(poblacion.indexOf(persona,1))
        poblacion.splice(poblacion.indexOf(persona,1),1);
        
    }
    
    
});
function persona() {
    this.edad = 1;

    this.cumpleaños = function () {
        this.edad = this.edad + 1;
    }

    
}

