import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { Usuario } from './model/usuario';

// describe("probar usuarios", () => {

//   beforeEach(waitForAsync(() => {

//     TestBed.configureTestingModule({
//       declarations: [AppComponent],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     }).compileComponents();
//   }));

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });
//   // TODO: add more tests!
// });


describe('Probando la clase de usuario', () => {
  describe('Probando que la contraseña sea correcta', () => {
    const user = new Usuario();
    user.setUser('atorres@duocuc.cl', '1234', 'Ana Torres Leiva', '¿Cuál es tu animal favorito?', 'gato', 'N', false);

    it('Probando que la contraseña este vacía', () => {
      user.password = '';
      expect(user.validatePassword(user.password)).toContain('Para entrar al sistema debe ingresar la contraseña.');
    });

    it('Probando que la contraseña sea numérica y no alfabetico', () => {
      user.password = 'abcd';
      expect(user.validatePassword(user.password)).toContain('La contraseña solo es numerica');
    });

    it('Probando que la contraseña no supere los 4 dígitos como por ejemplo "1234567890"', () => {
      user.password = '1234567890';
      expect(user.validatePassword(user.password)).toContain('debe ser numérica de 4 dígitos');
    });

    it('Probando que la contraseña sea de 4 dígitos como por ejemplo "1234"', () => {
      user.password = '1234';
      expect(user.validatePassword(user.password)).toEqual('');
    });

  });

  //Pruebas con correo

  describe('Probando correo electronico', () => {
    const user = new Usuario();
    user.setUser('atorres@duocuc.cl', '1234', 'Ana Torres Leiva', '¿Cuál es tu animal favorito?', 'gato', 'N', false);

    it('Probando que el correo no sea vacio', () => {
      user.correo = '';
      expect(user.validateEmail(user.correo)).toContain('ingresar el correo del usuario');
    });

    it('Probando que el correo termine con "@duocuc.cl', () => {
      user.correo = 'atorres@duocuc.cl';
      expect(user.validateEmail(user.correo)).toEqual('');
    });

    it('Probando que el correo sea valido', () => {
      user.correo = 'atorres@duocuc.cl';
      expect(user.validateEmail(user.correo)).toEqual('');
    });
  });

  describe('Probando validar nombre', () => {
    const user = new Usuario();
    user.setUser('atorres@duocuc.cl', '1234', 'Ana Torres Leiva', '¿Cuál es tu animal favorito?', 'gato', 'N', false);

    it("Debería no pedirme un nombre", () => {
      expect(user.validateName(user.nombreUsuario)).toEqual("");
    });
  });

  describe('Probando validar respuestas secreta', () => {
    const user = new Usuario();
    user.setUser('atorres@duocuc.cl', '1234', 'Ana Torres Leiva', '¿Cuál es tu animal favorito?', 'gato', 'N', false);

    it("Debería pedir una respuesta secreta", () => {
        user.respuesta = '';
        expect(user.validateSecretAnswer(user.respuesta)).toContain('Debe ingresar su respuesta secreta.');
    })
  });

});