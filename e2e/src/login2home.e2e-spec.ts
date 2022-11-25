import { browser, by, element } from 'protractor';

describe("ion-title", () => {
    beforeEach(() => {
    browser.get("/");
    });

    //prueba 1
    it("La pestaña login se muestra por defecto", () => {
        expect(element(by.css("ion-title a")).getText()).toContain("Recuperar contraseña");
    });

    it("El usuario puede navegar a la pestaña recuperar contraseña", async () => {
        await element(by.css("[class=a]")).click();
        expect(element(by.css(".subtitulo2 h5")).getText()).toContain("Recuperar contraseña");
    
    });
});