import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheDurationSelectorComponent } from './cache-duration-selector.component';

describe('CacheDurationSelectorComponent', () => {
  let component: CacheDurationSelectorComponent;
  let fixture: ComponentFixture<CacheDurationSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CacheDurationSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CacheDurationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
