import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentoManualConsultaComponent } from './movimento-manual-consulta.component';

describe('MovimentoManualConsultaComponent', () => {
  let component: MovimentoManualConsultaComponent;
  let fixture: ComponentFixture<MovimentoManualConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimentoManualConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentoManualConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
