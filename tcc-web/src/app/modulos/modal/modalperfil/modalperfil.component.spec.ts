import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalperfilComponent } from './modalperfil.component';

describe('ModalperfilComponent', () => {
  let component: ModalperfilComponent;
  let fixture: ComponentFixture<ModalperfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalperfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
