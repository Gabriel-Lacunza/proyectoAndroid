/*export class Usuario {
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
};*/

import { DBSQLiteValues } from "@capacitor-community/sqlite";
import { DatabaseService } from "../services/database.service";
import { SQLiteService } from "../services/sqlite.service";
import { showAlertDUOC } from "./Mensajes";

export class Usuario {
    public correo = '';
    public password = '';
    public nombreUsuario = '';
    public preguntaSecreta = '';
    public respuesta = '';
    public sesionActiva = '';

    constructor() { }

    setUser(correo: string,
      password: string,
      nombreUsuario: string,
      preguntaSecreta: string,
      respuesta: string,
      sesionActiva: string,
      hideSecrets: boolean)
  {
      this.correo = correo;
      this.nombreUsuario = nombreUsuario;
      this.sesionActiva = sesionActiva;
      if (hideSecrets) {
        this.password = '';
        this.preguntaSecreta = '';
        this.respuesta = '';
      
      } else {
        this.password = password;
        this.preguntaSecreta = preguntaSecreta;
        this.respuesta = respuesta;
      }
  }

    validateEmail(correo: string): string {
      if (correo.trim() === '') return 'Para ingresar al sistema debe ingresar el correo del usuario.';
      return '';
    }
  
    validatePassword(password: string): string {
      if (password.trim() === '') return 'Para entrar al sistema debe ingresar la contraseña.';
      return '';
    }

    async validateUser(correo: string, password: string, db: DatabaseService): Promise<boolean> {
      return new Promise(async (resolve) => {
        let msg = this.validateEmail(correo);
        if (msg) {
          await showAlertDUOC(msg);
          return Promise.resolve(false);
        }
        msg = this.validatePassword(password);
        if (msg) {
          await showAlertDUOC(msg);
          return Promise.resolve(false);
        }
        const usu = await db.readUser(correo, password, true);
        if (usu === null) {
          await showAlertDUOC('El correo o la contraseña no son correctos');
          return Promise.resolve(null);
        }
        this.correo = usu.correo;
        this.nombreUsuario = usu.nombreUsuario;
        this.sesionActiva = usu.sesionActiva;
        this.password = usu.password;
        this.preguntaSecreta = usu.preguntaSecreta;
        this.respuesta = usu.respuesta;
        return Promise.resolve(usu);
      });
    }
  }
  