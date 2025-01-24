import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionItemComponent } from './opcion-item.component';

describe('OpcionItemComponent', () => {
  let component: OpcionItemComponent;
  let fixture: ComponentFixture<OpcionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
