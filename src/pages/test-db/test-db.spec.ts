import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import { TestDbPage } from './test-db';

import { LibraryProvider } from '../../providers/library-provider';
import { LibraryProviderMock} from '../../providers/library-provider.mock';
import { LibraryService } from '../../providers/library-service'
import { LibraryServiceMock } from '../../providers/library-service.mock'

let comp: TestDbPage;
let fixture: ComponentFixture<TestDbPage>;

describe('Page: Test DB Page', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, TestDbPage],
            providers: [
                {
                    provide: LibraryProvider,
                    useClass: LibraryProviderMock
                },
                {
                    provide: LibraryService,
                    useClass: LibraryServiceMock
                },
            ],
            imports: [
                IonicModule.forRoot(MyApp)
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDbPage);
        comp    = fixture.componentInstance;
    })

    afterEach(() => {
        fixture.destroy();
        comp = null;
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
})