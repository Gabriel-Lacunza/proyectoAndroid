import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { Usuario } from './model/usuario';



describe("probar usuarios", () => {
  const usuario = new Usuario()

  it("debería no pedirme un correo", () => {
    expect(usuario.validateEmail("gab.lacunza@duocuc.cl")).toEqual("");
  });
  
  it("debería no pedirme un nombre", () => {
    expect(usuario.validateName("gabriel")).toEqual("");
  });

  it("debería pedir una respuesta secreta", () => {
    expect(usuario.validateSecretAnswer("")).toContain('Debe ingresar su respuesta secreta.');
  })

});
