import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capSQLiteChanges, CapacitorSQLitePlugin
    , capSQLiteOptions, DBSQLiteValues} from '@capacitor-community/sqlite';

import { log, showAlertError } from '../model/Mensajes';

@Injectable()

export class SQLiteService {
    platform: string;
    isNative: boolean = false;
    isService: boolean = false;
    capacitorSQLitePlugin: CapacitorSQLitePlugin;
    sqlite: SQLiteConnection;
    db: SQLiteDBConnection;
    database: string;
    encrypted: boolean = false;
    mode: string;
    version: number;
    readonly: boolean;
    dbOptions: capSQLiteOptions;
    dbChanges: capSQLiteChanges;
    changes: number;
    isRunning: boolean;
    initError: string;
    sqlInsertUser = 'INSERT INTO Usuario (correo, password, nombreUsuario, preguntaSecreta, respuesta, sesionActiva) VALUES (?,?,?,?,?,?)';
    sqlSelectAllUsers = 'SELECT * FROM Usuario';

    constructor() { }

    StartSQLiteService(createSchema: string, callee: string): Promise<boolean> {

        this.database = 'asistencia';
        this.encrypted = false;
        this.mode = 'no-encryption';
        this.version = 1;
        this.readonly = false;
        this.dbOptions = {database: this.database, readonly: this.readonly };

        return new Promise(async resolve => {
            try {
                
                log('StartSQLiteService', `Iniciar servicio desde ${callee}`);
                log('StartSQLiteService', `db:${this.database} enc:${this.encrypted} mode:${this.mode} ver:${this.version} readonly:${this.readonly}`);
                this.platform = Capacitor.getPlatform();
                if(this.platform === 'ios' || this.platform === 'android') this.isNative = true;
                this.capacitorSQLitePlugin = CapacitorSQLite;
                await this.capacitorSQLitePlugin.closeConnection(this.dbOptions).catch((reason) => console.log(reason))
                this.sqlite = new SQLiteConnection(this.capacitorSQLitePlugin);
                this.db = await this.createConnection();
                this.db.open();
                await this.db.execute(createSchema);
                const rs: DBSQLiteValues = await this.query(this.sqlSelectAllUsers);
                log('StartSQLiteService', `Cantidad de usuarios: ${rs.values.length}`);
                rs.values.forEach((value, index) => {
                    log('StartSQLiteService', 
                        `Usuario ${index}: ${value.correo}, ${value.password}, ${value.sesionActiva}` 
                        + `${value.nombreUsuario}, ${value.preguntaSecreta}, ` 
                        + `${value.respuestaSecreta}, ` 
                        + `${value.sesionActiva}`
                    );
                });
                this.isRunning = true;
                log('StartSQLiteService', 'Servicio iniciado');
                resolve(true);
            } catch(err) {
                log('StartSQLiteService', 'Servicio no pudo ser iniciado');
                await showAlertError('StartSQLiteService', err);
                this.isRunning = false;
                resolve(false);
            }
        });
    }
    
    getErrorMessage(method: string, msg: string): string {
        return `SQLiteService error in ${this.database}, Method ${method}. ${msg}`;
    }

    alertError(method: string, msg: string) {
        const message = this.getErrorMessage(method, msg);
        console.log(message);
        alert(message);
    }

    async createUser(correo: string, password: string, nombreUsuario: string, preguntaSecreta: string, respuesta: string, sesionActiva: string): Promise<capSQLiteChanges> {
        return await this.run(this.sqlInsertUser, [correo, password, nombreUsuario, preguntaSecreta, respuesta, sesionActiva]);
    }

    getChanges(): number {
        return this.dbChanges.changes.changes;
    }

    async createConnection(): Promise<SQLiteDBConnection> {
        return await this.sqlite.createConnection(this.database, this.encrypted, this.mode, this.version, this.readonly);
    }

    async closeConnection(): Promise<void> {
        return await this.sqlite.closeConnection(this.database, this.readonly);
    }

    async deleteDatabase(): Promise<void> {
        return this.capacitorSQLitePlugin.deleteDatabase(this.dbOptions);
    }

    async execute(query: string): Promise<capSQLiteChanges> {
        this.dbChanges = await this.db.execute(query);
        return this.dbChanges;
    }

    async run(query: string, parameters?: any[]): Promise<capSQLiteChanges> {
        return await this.db.run(query, parameters);
    }

    async query(query: string, parameters?: any[]): Promise<DBSQLiteValues> {
        return await this.db.query(query, parameters);
    }
  
}
