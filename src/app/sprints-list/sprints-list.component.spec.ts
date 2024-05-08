/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SprintsListComponent } from './sprints-list.component';

describe('SprintsListComponent', () => {
  let component: SprintsListComponent;
  let fixture: ComponentFixture<SprintsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
