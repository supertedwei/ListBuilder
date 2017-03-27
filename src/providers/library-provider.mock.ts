import { EventEmitter } from '@angular/core';

export class LibraryProviderMock {

    public listChanged$ = new EventEmitter();

    listAll() {}
}