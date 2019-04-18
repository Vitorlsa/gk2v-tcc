import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroContratanteComponent } from './cadastro-contratante.component';

describe('CadastroContratanteComponent', () => {
  let component: CadastroContratanteComponent;
  let fixture: ComponentFixture<CadastroContratanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroContratanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroContratanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
