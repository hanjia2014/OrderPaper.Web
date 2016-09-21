import { Observable }   from 'rxjs/Observable';
import { Response }     from '@angular/http';

export interface ITogglable {
    toggle: (eleId: string) => void;
}