import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngresoRespuestaSecretaPage } from './ingreso-respuesta-secreta.page';

describe('IngresoRespuestaSecretaPage', () => {
  let component: IngresoRespuestaSecretaPage;
  let fixture: ComponentFixture<IngresoRespuestaSecretaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoRespuestaSecretaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoRespuestaSecretaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
