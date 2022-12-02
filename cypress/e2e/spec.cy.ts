describe('Verificar Aplicacion', () => {
  it('Probar pagina de Recuperar Contraseña', () => {
    cy.visit('http://localhost:8100/').then(() => {
      cy.wait(2000)
      cy.contains('Recuperar contraseña').click({force: true});
      cy.wait(2000)
      cy.intercept('/correo').as('route').then(() => {
        cy.get('h1').should('contain.text','Sistema de Asistencia DUOC')
        cy.wait(2000)
        cy.get('ion-label').should('contain.text', 'Recuperar contraseña')
        cy.wait(2000)
        cy.get('.subtitulo').should('contain.text', 'Paso 1: Ingresa tu correo')
        cy.contains('Iniciar sesión').click({force: true});
        cy.intercept('/ingreso').as('route');
      });
    })
  });

  it('Probar pagina de Registrarse', () => {
    cy.visit('http://localhost:8100/').then(() => {
      cy.wait(2000)
      cy.contains('Registrar').click({force: true});
      cy.wait(2000)
      cy.intercept('/create-user').as('route').then(() => {
        cy.get('ion-title').should('contain.text','Registro de usuario')
        cy.wait(2000)
        cy.get('h1').should('contain.text', 'Ingresa tus datos')
        cy.wait(2000)
        cy.contains('Volver').click({force: true});
        cy.intercept('/ingreso').as('route');
      });
    });
  });

  it('Probar las paginas sin iniciar sesion', () => {
    cy.visit('http://localhost:8100/home').then(() => {
      cy.wait(2000)
    });
    cy.visit('http://localhost:8100/delete-user').then(() => {
      cy.wait(2000)
      cy.contains('Volver').click({force: true});
      cy.wait(2000)
    });
  });

  it('Probar que el usuario no puede ingresar a pregunta antes de ingresar un correo', () => {
    cy.visit('http://localhost:8100/recuperar').then(() => {
      cy.wait(2000)
      cy.contains('Recuperar contraseña').click({force: true});
      cy.wait(2000)
    });
  });  
});
