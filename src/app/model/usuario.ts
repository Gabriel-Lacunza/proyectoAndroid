export class Usuario {
    public nombreUsuario = '';
    public password = '';

    public validarNombreUsuario(): string {
      if (this.nombreUsuario.trim() === '') {
        return 'Para ingresar al sistema debe ingresar un correo.';
      }
      return '';
    }
   
    public validarPassword(): string {
      if (this.password.trim() === '') {
        return 'Para entrar al sistema debe ingresar la contraseña.';
      }
      if (this.password.length !== 4) {
        return 'La contraseña debe ser de 4 caracteres.';
      }
      return '';
    }
   
    public validarUsuario(): string {
      return this.validarNombreUsuario()
        || this.validarPassword();
    }
  }
  