import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { EventEmitter } from '@angular/core';

import { MyApp } from '../../app/app.component';
import { TestDbPage } from './test-db';

import { LibraryProvider } from '../../providers/library-provider';
import { LibraryService } from '../../providers/library-service'

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

export class LibraryProviderMock {
    public listChanged$ = new EventEmitter();
    listAll() {}
}

export class LibraryServiceMock {

}