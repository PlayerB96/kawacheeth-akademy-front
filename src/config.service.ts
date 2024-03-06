import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    apiUrl: string = 'http://143.244.144.235:8000/api/';
    apiUrlHashGraph: string = 'http://143.244.144.235:3000/api/';

}
