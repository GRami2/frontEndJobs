import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSectorComponent } from './save-sector.component';

describe('SaveSectorComponent', () => {
  let component: SaveSectorComponent;
  let fixture: ComponentFixture<SaveSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveSectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
