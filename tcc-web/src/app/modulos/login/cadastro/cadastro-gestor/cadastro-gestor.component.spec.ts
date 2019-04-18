import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroGestorComponent } from './cadastro-gestor.component';

describe('CadastroGestorComponent', () => {
  let component: CadastroGestorComponent;
  let fixture: ComponentFixture<CadastroGestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroGestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
