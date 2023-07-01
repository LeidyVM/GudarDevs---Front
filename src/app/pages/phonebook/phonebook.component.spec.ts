import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonebookComponent } from './phonebook.component';

describe('PhonebookComponent', () => {
  let component: PhonebookComponent;
  let fixture: ComponentFixture<PhonebookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhonebookComponent]
    });
    fixture = TestBed.createComponent(PhonebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
