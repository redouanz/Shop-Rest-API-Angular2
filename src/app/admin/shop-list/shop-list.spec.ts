import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopList } from './shop-list';

describe('ShopList', () => {
  let component: ShopList;
  let fixture: ComponentFixture<ShopList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
