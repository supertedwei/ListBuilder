import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from './config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
 
let comp: MyApp;
let fixture: ComponentFixture<MyApp>;
 
describe('Component: Root Component', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [MyApp],
 
            providers: [
                StatusBar,
                SplashScreen,
                AppVersion
            ],
 
            imports: [
                IonicModule.forRoot(MyApp),
                AngularFireModule.initializeApp(FirebaseConfig),
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
 
        fixture = TestBed.createComponent(MyApp);
        comp    = fixture.componentInstance;
 
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
    });
 
    it('is created', () => {
 
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
 
    });
 
    // it('displays the product page to the user', () => {
    //     expect(comp['rootPage']).toBe(ProductPage);
    // });
 
});