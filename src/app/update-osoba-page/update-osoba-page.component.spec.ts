import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOsobaPageComponent } from './update-osoba-page.component';

describe('UpdateOsobaPageComponent', () => {
  let component: UpdateOsobaPageComponent;
  let fixture: ComponentFixture<UpdateOsobaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOsobaPageComponent]
    });
    fixture = TestBed.createComponent(UpdateOsobaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
