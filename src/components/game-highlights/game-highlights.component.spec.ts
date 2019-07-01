import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHighlightsComponent } from './game-highlights.component';

describe('GameHighlightsComponent', () => {
  let component: GameHighlightsComponent;
  let fixture: ComponentFixture<GameHighlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameHighlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
