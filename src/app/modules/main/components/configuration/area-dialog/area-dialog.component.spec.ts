import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDialogComponent } from './area-dialog.component';

describe('AreaDialogComponent', () => {
  let component: AreaDialogComponent;
  let fixture: ComponentFixture<AreaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
