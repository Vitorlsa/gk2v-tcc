import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnaliseComponent } from './modal-analise.component';

describe('ModalAnaliseComponent', () => {
  let component: ModalAnaliseComponent;
  let fixture: ComponentFixture<ModalAnaliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAnaliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
