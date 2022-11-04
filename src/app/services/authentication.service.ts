import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { capSQLiteChanges } from '@capacitor-community/sqlite';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Mensajes } from '../model/Mensajes';
import { DatabaseService } from './database.service';
import { StorageService } from './storage.service';

import { capValueResult } from 'capacitor-data-storage-sqlite';
import { Usuario } from '../model/usuario';
import { log, showAlertError, showToast } from '../model/Mensajes';

@Injectable()

export class AuthenticationService {

    /*constructor(
        private router: Router,
        private storage: StorageService,
        private db: DatabaseService,
        private toastController: ToastController) 
    { 

    }*/
/*
    getErrorMessage(method: string, msg: string): string {
        return `AuthenticationService error in ${this.storage.database}, Method ${method}. ${msg}`;
    }

    alertError(method: string, msg: string) {
        const message = this.getErrorMessage(method, msg);
        console.log(message);
        alert(message);
    }*/

    /*initializeAuthentication(): Promise<boolean> {
        return new Promise(async resolve => {
            try {
                await this.storage.initializePlugin();
                this.isLogged();
                return Promise.resolve(true);
            } catch(err) {
                this.alertError('initializeAuthentication', err);
                return Promise.resolve(false);
            };
        });
    }

    isLogged(){
        this.storage.getItem("USER_DATA").then((valueResult) => {
            console.log(`AuthenticationService valueResult.value:${valueResult.value}`);
            if(valueResult != null) this.authState.next(true);
        });
    }

    isAuthenticated() {
        return this.authState.value;
    }*/

    /*async login(correo: string, password: string) {
        try {
            const usu = await this.databaseService.readUser(correo, password, true);
            if(usu === null) {
                new Mensajes().showToast("El correo y la contraseña no son válidos");
            } else {
                debugger
                const resp = await this.databaseService.updateActiveSession(correo, 'S');
                if (resp.changes.changes === 1) {
                    //new Mensajes().showToast(`¡Bienvenido(a) ${usu.nombreUsuario}!`);
                    this.storage.setItem("USER_DATA", JSON.stringify(usu));
                    this.authState.next(true);
                    this.router.navigate(['/home']);
                } else {
                    new Mensajes().showToast(`No fue posible actualizar la sesión`);
                }
            }
        } catch(err) {
            this.alertError('login', err);
        }
    }*/

//}

//-------------------------------------------------------------------------------------------------------------

//export class AuthService {

    AuthenticationService = new BehaviorSubject(false);
    loginState = new BehaviorSubject(false);


    constructor(
        private router: Router,
        private storage: StorageService,
        private db: DatabaseService) 
    { 
        
    }

    getErrorMessage(method: string, msg: string): string {
        return `AuthenticationService error in ${this.storage.database}, Method ${method}. ${msg}`;
    }

    alertError(method: string, msg: string) {
        const message = this.getErrorMessage(method, msg);
        console.log(message);
        alert(message);
    }

    async StartAuthService(): Promise<boolean> {
        return await this.storage.StartStorageService('StartAuthenticationService');
    }

    async isLogged(): Promise<boolean> {
        log('isLogged', 'Revisar si el usuario inició sesión')
        return await this.storage.authUserExists().then(autenticado => {
            log('isLogged', autenticado? 'El usuario ha iniciado sesión': 'El usuario no ha iniciado sesión');
            if (autenticado) {
                this.AuthenticationService.next(true);
            }
            return true;
        });
    }

    isAuthenticated(): Promise<boolean> {
        log('isAuthenticated', 'Iniciar servicio de autenticación')
        log('isAuthenticated', 'Revisar si el usuario inició sesión')
        return this.storage.authUserExists().then(autenticado => {
            log('isAuthenticated', autenticado? 'El usuario ha iniciado sesión': 'El usuario no ha iniciado sesión');
            return autenticado;
        });
    }

    async login(mail: string, password: string) {
        try {
            this.db.readUser(mail, password, false).then( async (res) => {
                if(res.length > 0) {
                    let data = res[0];
                    const usu = new Usuario();
                    usu.setUser(
                        data.correo,
                        data.password,
                        data.nombreUsuario,
                        data.preguntaSecreta,
                        data.respuestaSecreta,
                        'S', 
                        true
                    );
                    await this.storage.clear();
                    await this.db.updateActiveSession(mail, 'S');
                    this.storage.setItem('USER_DATA', JSON.stringify(usu));
                    this.AuthenticationService.next(true);
                    this.router.navigate(['/home/inicio']);
                    return;
                }
            })
        }catch(err) {
            this.AuthenticationService.next(false);
            console.log(err);
        }
    }

    async logout() {
        console.log('Iniciando logout');
        try {
            const data: capValueResult = await this.storage.getItem('USER_DATA');


            if (data !== null) {
                if (data.value !== '') {
                    const usu = JSON.parse(data.value);
                    const response: capSQLiteChanges = await this.db.updateActiveSession(usu.correo, 'N');
                    if (response.changes.changes === 1) {
                        showToast(`¡Hasta pronto ${usu.nombreUsuario}!`);
                        await this.storage.removeItem('USER_DATA');
                        await this.db.logUsers();
                        this.router.navigate(['login']);
                        this.AuthenticationService.next(false);
                    } else {
                        console.log(`No fue posible actualizar la sesión`);
                    }
                }
            }

        } catch(err) {
            await showAlertError('AuthenticationService.logout', err);
        }
    }


}

