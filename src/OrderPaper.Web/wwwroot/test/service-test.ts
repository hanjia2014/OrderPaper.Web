import { inject, TestBed, async, fakeAsync }                                               from '@angular/core/testing';
import { MockBackend, MockConnection }                                          from '@angular/http/testing';
import { OrderPaperService }                                                    from '../app/services/app.services';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, HttpModule }   from '@angular/http';
import { GroupItem } from '../app/models/items';

const mockHttpProvider = {
    deps: [MockBackend, BaseRequestOptions],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
}

class MockOrderPaperService extends OrderPaperService {
    public sayHello = () => {
        return this.apiOrderpapersummaryUrl;
    }
}

describe('Group Item', () => {
    it('should return empty item list', () => {
        expect(new GroupItem().Items.length).toEqual(0);
    });
});