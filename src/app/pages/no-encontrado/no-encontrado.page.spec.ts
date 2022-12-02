import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoEncontradoPage } from './no-encontrado.page';

describe('Probando pagina "No-encontrado"', () => {
  let component: NoEncontradoPage;
  let fixture: ComponentFixture<NoEncontradoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoEncontradoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoEncontradoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Deberia crear pagina "No-encontrado"', () => {
    expect(component).toBeTruthy();
  });
});
