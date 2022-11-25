import { Injectable } from '@angular/core';
import { capSQLiteChanges, DBSQLiteValues} from '@capacitor-community/sqlite';
import { Usuario } from '../model/usuario';
import { SQLiteService } from './sqlite.service';

@Injectable()

export class DatabaseService {

    createSchema: string = `
        CREATE TABLE IF NOT EXISTS USUARIO (
            correo TEXT PRIMARY KEY NOT NULL,
            password TEXT NOT NULL,
            nombreUsuario TEXT NOT NULL,
            preguntaSecreta TEXT NOT NULL,
            respuesta TEXT NOT NULL,
            sesionActiva TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS EXPERIENCIA_LABORAL
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            empresa TEXT NOT NULL,
            incio INTEGER NOT NULL,
            trabajoActual TEXT NOT NULL,
            termino INTEGER,
            cargo TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS CERTIFICACION
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombreUsuario TEXT NOT NULL,
            fecha TEXT NOT NULL,
            vencimiento INTEGER NOT NULL,
            fechaVencimiento TEXT
        );
    `;
    sqlInsertUser = 'INSERT INTO Usuario (correo, password, nombreUsuario, preguntaSecreta, respuesta, sesionActiva) VALUES (?,?,?,?,?,?)';
    sqlSelectUser = 'SELECT * FROM Usuario WHERE correo=? AND password=? LIMIT 1';
    sqlSelectAllUsers = 'SELECT * FROM Usuario';
    sqlSelectUserMail = 'SELECT * FROM Usuario WHERE correo=? LIMIT 1';
    sqlUpdateActiveSesion = 'UPDATE Usuario SET sesionActiva=? WHERE correo=?';
    sqlSelectActiveSession = `SELECT correo, sesionActiva FROM Usuario WHERE sesionActiva = 'S' LIMIT 1`;
    sqlUpdateUser = `UPDATE USUARIO SET 
                        password = ?, 
                        nombreUsuario = ?, 
                        preguntaSecreta = ?, 
                        respuesta = ?, 
                        sesionActiva = ?
                    WHERE
                        correo = ?`;
    sqlDeleteUser = 'DELETE FROM USUARIO WHERE correo = ?';

    constructor(private sqlite: SQLiteService) { }
    
    getErrorMessage(method: string, msg: string): string {
        return `DatabaseService error in ${this.sqlite.database}, Method ${method}. ${msg}`;
    }

    alertError(method: string, msg: string) {
        const message = this.getErrorMessage(method, msg);
        console.log(message);
        alert(message);
    }

    StartDatabaseService(createDatabaseFromScratch: boolean): Promise<boolean> {
        return this.sqlite.StartSQLiteService(this.createSchema, createDatabaseFromScratch, 'StartDatabaseService');
    }

    async createUser(correo: string, password: string, nombreUsuario: string, preguntaSecreta: string, respuesta: string, sesionActiva: string): Promise<capSQLiteChanges> {
        return await this.sqlite.run(this.sqlInsertUser, [correo, password, nombreUsuario, preguntaSecreta, respuesta, sesionActiva]);
    }

    async readUsers(): Promise<DBSQLiteValues> {
        return await this.sqlite.query(this.sqlSelectAllUsers);
    }

    async readUser(correo: string, password: string, hideSecrets: boolean): Promise<any> {
        const { values } = await this.sqlite.query(this.sqlSelectUser, [correo, password]);
        return values;
        // const usu = new Usuario();
        // const r = rs.values[0];
        // usu.setUser(
        //     r.correo, 
        //     r.password, 
        //     r.nombreUsuario, 
        //     r.preguntaSecreta, 
        //     r.respuestaSecreta, 
        //     r.sesionActiva, 
        //     hideSecrets
        // );
    }

    async logUsers() {
        const rs: DBSQLiteValues = await this.readUsers();
        console.log(`Cantidad de usuarios: ${rs.values.length}`);
        rs.values.forEach((value, index) => {
            console.log(
                `Correo ${index}: ${value.correo}, ${value.password}, ` +
                `${value.nombreUsuario}, ${value.preguntaSecreta}, ` +
                `${value.respuesta}, ` +
                `${value.sesionActiva}`
            );
        });
    }

    async readActiveSession(): Promise<DBSQLiteValues> {
        return await this.sqlite.db.query(this.sqlSelectActiveSession, []);
    }

    async updateActiveSession(correo: string, sesionActiva: string): Promise<capSQLiteChanges> {
        return await this.sqlite.run(this.sqlUpdateActiveSesion, [sesionActiva, correo]);
    }

    async userList(hideSecrets: boolean): Promise<Usuario[]> {
        const lista = [];
        const rs = await this.readUsers();
        rs.values.forEach((r, index) => {
            let usu = new Usuario();
            if (hideSecrets) {
                r.password = '';
                r.preguntaSecreta = '';
                r.respuesta = '';
            }
            usu.setUser(
                r.correo, 
                r.password, 
                r.nombreUsuario, 
                r.preguntaSecreta, 
                r.respuesta, 
                r.sesionActiva, 
                hideSecrets
            );
            lista.push(usu);
        });
        return lista;
    }

    async updateUser(usuario: Usuario): Promise<capSQLiteChanges> {
        return await this.sqlite.run(this.sqlUpdateUser, 
            [
                usuario.password,
                usuario.nombreUsuario,
                usuario.preguntaSecreta,
                usuario.respuesta,
                usuario.sesionActiva,
                usuario.correo
            ]);
    }

    async deleteUser(correo: string): Promise<capSQLiteChanges> {
        return await this.sqlite.run(this.sqlDeleteUser, [correo]);
    }
  

    async buscarCorreo(correo: string): Promise<any> {
        const { values } = await this.sqlite.query(this.sqlSelectUserMail, [correo]);
        return values;
    }
}