import { PrefredShopList } from './preferedShop-list';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';



describe('PrefredShopList', () => {
  let component: PrefredShopList;
  let fixture: ComponentFixture<PrefredShopList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefredShopList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefredShopList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
