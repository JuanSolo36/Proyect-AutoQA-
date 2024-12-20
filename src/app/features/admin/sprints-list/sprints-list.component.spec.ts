import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintsListComponent } from './sprints-list.component';

describe('SprintsListComponent', () => {
  let component: SprintsListComponent;
  let fixture: ComponentFixture<SprintsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
