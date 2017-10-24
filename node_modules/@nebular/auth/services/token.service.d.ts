import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
export declare class NbAuthSimpleToken {
    protected token: string;
    setValue(token: string): void;
    getValue(): string;
}
export declare class NbAuthJWTToken extends NbAuthSimpleToken {
    getPayload(): any;
    getTokenExpDate(): Date;
}
export declare class NbTokenService {
    protected options: any;
    protected tokenWrapper: NbAuthSimpleToken;
    protected defaultConfig: any;
    protected config: any;
    protected token$: BehaviorSubject<any>;
    constructor(options: any, tokenWrapper: NbAuthSimpleToken);
    setConfig(config: any): void;
    getConfigValue(key: string): any;
    set(rawToken: string): Observable<null>;
    get(): Observable<NbAuthSimpleToken>;
    tokenChange(): Observable<NbAuthSimpleToken>;
    clear(): Observable<any>;
    protected publishToken(token: NbAuthSimpleToken): void;
}
