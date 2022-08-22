import { nivelEducacional } from "./nivelEducacional";

export class persona{
    //atributos de la clase
    public nombre = "";
    public apellido = "";
    public nivelEducacional: nivelEducacional = new nivelEducacional();
    public fechaNacimiento = "" ;

    //obtiene id del nivel educacional como texto
    public getIdNivelEducacional(): string {
        if (this.nivelEducacional.id === 0){
            return "no asignado";
        }
        return this.nivelEducacional.id.toString();
    }

    //obtiene el nombre del nivel educacional
    getNombreNivelEducacional(): string {
        if (this.nivelEducacional.nombre.trim() === ""){
            return "no asignado";
        }
        return this.nivelEducacional.nombre
    }

    //obtiene la fecha de nacimiento como texto
    public getFechaNacimiento(): string {
        if (this.fechaNacimiento.trim() === ""){
            return "no asignado";
        }
        return this.fechaNacimiento.trim();
    }

    public getNivelEducacional(): string {
        return this.nivelEducacional.getNivelEducacionalCompleto();
    }
}