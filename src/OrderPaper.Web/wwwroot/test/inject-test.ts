import { inject, TestBed }                                                      from '@angular/core/testing';
import { MockBackend, MockConnection }                                          from '@angular/http/testing';
import { OrderPaperService }                                                    from '../app/services/app.services';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod }   from '@angular/http';

//describe('default test injector', () => {
//    beforeEach(() => {
//        TestBed.configureTestingModule({
//            providers: [
//                MockBackend,
//                BaseRequestOptions,
//                {
//                    provide: Http,
//                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
//                        return new Http(backendInstance, defaultOptions);
//                    },
//                    deps: [MockBackend, BaseRequestOptions]
//                },
//                OrderPaperService
//            ]
//        });
//    });

//    let opservice: OrderPaperService = null;
//    let backend: MockBackend = null;

//    beforeEach(inject([OrderPaperService, MockBackend], (userService: OrderPaperService, mockBackend: MockBackend) => {
//        opservice = userService;
//        backend = mockBackend;
//    }));

//    it('should provide default id', () => {
//        backend.connections.subscribe((connection: MockConnection) => {
//            let options = new ResponseOptions({
//                body: JSON.stringify({ success: true })
//            });
//            connection.mockRespond(new Response(options));
//        });

//        opservice.getOrderPaperList().subscribe(
//            (data: any) => {
//                expect(data != null).toEqual(true);
//            },
//            (err: any) => this.error = err);
//    });
//});