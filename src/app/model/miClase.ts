export class miClase {
    public sede = '';
    public idAsignatura = '';
    public seccion = '';
    public nombreAsignatura = '';
    public nombreProfesor = '';
    public dia = '';
    public bloqueInicio = '';
    public bloqueTermino = '';
    public horaInicio = '';
    public horaFin = '';

    constructor() { }

    setMiClase(sede: string,
        idAsignatura: string,
        seccion: string,
        nombreAsignatura: string,
        nombreProfesor: string,
        dia: string,
        bloqueInicio: string,
        bloqueTermino: string,
        horaInicio: string,
        horaFin: string)
    {
        this.sede = sede;
        this.idAsignatura = idAsignatura;
        this.seccion = seccion;
        this.nombreAsignatura = nombreAsignatura;
        this.nombreProfesor = nombreProfesor;
        this.dia = dia;
        this.bloqueInicio = bloqueInicio;
        this.bloqueTermino = bloqueTermino;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
    }
}