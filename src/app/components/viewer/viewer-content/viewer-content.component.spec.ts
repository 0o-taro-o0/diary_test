import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerContentComponent } from './viewer-content.component';

describe('ViewerContentComponent', () => {
  let component: ViewerContentComponent;
  let fixture: ComponentFixture<ViewerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
