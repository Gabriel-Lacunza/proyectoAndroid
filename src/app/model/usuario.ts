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

    
    validateName(nombre: string): string {
      if (nombre.trim() === '') return 'Debe ingresar su nombre.';
      return '';
    }

    validateSecretQuestion(question: string): string {
      if (question.trim() === '') return 'Debe ingresar su pregunta secreta.';
      return '';
    }

    validateSecretAnswer(answer: string): string {
      if (answer.trim() === '') return 'Debe ingresar su respuesta secreta.';
      return '';
    }

        validateUserFields(correo: string, password: string, name: string
      , secretQuestion: string, secretAnswer: string): string {
    return this.validateEmail(correo) 
      || this.validatePassword(password)
      || this.validateName(name)
      || this.validateSecretQuestion(secretQuestion)
      || this.validateSecretAnswer(secretAnswer)
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
  