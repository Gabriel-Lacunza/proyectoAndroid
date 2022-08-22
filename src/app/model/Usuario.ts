export class usuario {
    //atributos de la clase
    public nombreUsuario = "";
    public password ="";

    //valida el nombre de usuario
    public validarNombreUsuario(): string {
        if (this.nombreUsuario.trim()=== ""){
            return "para ingresar al sistema debe ingresar un nombre de usuario";
        }

        if (this.nombreUsuario.length < 3 || this.nombreUsuario.length > 8){
            return "el nombre de usuario debe rener entre 3 y 8 caracteres";
        }

        return "";
    }

    //valida la contraseña ingresada
    public validarPassword(): string {
        if (this.password.trim() === '') {
        return 'Para entrar al sistema debe ingresar la contraseña.';
        }
        for(let i = 0; i < this.password.length; i++) {
        if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
            return 'La contraseña debe ser numérica.';
        }
        }
        if (this.password.length !== 4) {
        return 'La contraseña debe ser numérica de 4 dígitos.';
        }
        return '';
    }

    //valida que el nombre de usuario y la clave sirvan
    public validarUsuario(): string {
        return this.validarNombreUsuario()
        || this.validarPassword();
    }
}