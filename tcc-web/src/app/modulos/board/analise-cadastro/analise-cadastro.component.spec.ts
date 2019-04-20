import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseCadastroComponent } from './analise-cadastro.component';

describe('AnaliseCadastroComponent', () => {
  let component: AnaliseCadastroComponent;
  let fixture: ComponentFixture<AnaliseCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
