import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertOsobaPageComponent } from './insert-osoba-page.component';

describe('InsertOsobaPageComponent', () => {
  let component: InsertOsobaPageComponent;
  let fixture: ComponentFixture<InsertOsobaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertOsobaPageComponent]
    });
    fixture = TestBed.createComponent(InsertOsobaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
