export class Usuario {
    public nombreUsuario = '';
    public password = '';
    public nombre = "";
    public fraseSecreta = "";
    public respuesta = "";

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

type usuarios = {
  nombreUsuario: string, 
  password: string, 
  nombre: string, 
  fraseSecreta: string, 
  respuesta: string
}

const usuariosSistema: usuarios[] = [
  {nombreUsuario: "atorres@duocuc.cl", password: "1234", nombre: "Ana Torres Lelva", fraseSecreta: "nombre de tu mascota", respuesta: "gato"},
  {nombreUsuario: "avalenzuela@duocuc.cl", password: "qwer", nombre: "Alberto Valenzuela Nuñez", fraseSecreta: "nombre de tu mejor amigo", respuesta: "juanito"},
  {nombreUsuario: "cfuentes@duocuc.cl", password: "asdf", nombre: "Carla Fuentes Gonzales", fraseSecreta: "lugar de nacimiento de tu madre", respuesta: "valparaiso"}
]

export const buscarUsuario = (nombreUsuario: string) => {
  const e = usuariosSistema.find(user => user.nombreUsuario === nombreUsuario);
  if (!e) return {nombreUsuario: "", password: "", nombre: "", fraseSecreta: "", respuesta: ""}
  return e
};