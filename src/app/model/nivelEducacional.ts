export class nivelEducacional{
    //atributos de la clase
    public id: number;
    public nombre: string;

    //constructor de la clase
    public constructor(){
        this.id = 0;
        this.nombre = "";
    }

    //obteniendo objetos de la clase
    public getNivelEducacional() : nivelEducacional[] {
        const nivelesEducacionales = [];

        nivelesEducacionales.push({id: 1, nombre: "basica incompleta"});
        nivelesEducacionales.push({id: 2, nombre: "basica completa"});
        nivelesEducacionales.push({id: 3, nombre: "media incompleta"});
        nivelesEducacionales.push({id: 4, nombre: "media completa"});
        nivelesEducacionales.push({id: 5, nombre: "superior incompleta"});
        nivelesEducacionales.push({id: 6, nombre: "superior completa"});

        return nivelesEducacionales;
    }

    //cambiar datos de un objeto
    public setNivelesEducacionales(id: number, nombre:string) {
        this.id = id;
        this.nombre = nombre;
    }

    //bucar objetos por nombre
    public findNombreBy(id: number){
        if (id < 1 || id > 6) {
            return "sin nivel esducacional";
        }

        return this.getNivelEducacional().find(n => n.id === id).nombre;
    }

    //obtener id de un objeto por id como un texto
    public getTextId(): string {
        if (this.id < 1 || this.id > 6) {
            return "sin nivel esducacional";
        }
        return this.id.toString();
    }

    //obtener nombre de un objeto
    public getNombre(): string {
        return this.nombre? this.nombre : "no asignado";
    }

    //obtienes todos los datos de un objeto
    public getNivelEducacionalCompleto(): string {
        if (this.id < 1 || this.id > 6) {
            return "no asignado";
        }else{
            return this.id.toString() + " - " + this.findNombreBy(this.id);
        }
    }
}