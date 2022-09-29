import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from 'src/app/models/httpResponse.model';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
import { StrUtils } from '../utils/str.utils';
import { Utils } from '../utils/utils.utils';

const AUTHORIZATION_HEADER = 'Authorization';
const API_KEY_HEADER = 'api_key';
const CONTENT_TYPE_HEADER = 'Content-Type';
const CONTENT_TYPE_JSON = 'application/json; charset=utf-8';

export interface RestOptions {
    headers?: { [key: string]: string };
    query?: { [key: string]: string };
    authorization?: string;
    jsonBody?: boolean;
}

export interface SearchOptions {
    fields?: string[];
    limit?: number;
    page?: number;
    orderBy?: string[];
    order?: 'ASC' | 'DESC';
    expand?: boolean;
    all?: boolean;
    query?: any;
}

export class Rest {

    public static API_URL = environment.host;
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    protected processURL(url: string, params?: any) {
        let result = url;
        if (params && Utils.hasKeys(params)) {
            for (const paramKey of Object.keys(params)) {
                const paramValue = params[paramKey];
                result = StrUtils.replace(result, '{' + paramKey + '}', paramValue);
            }
        }
        return result;
    }

    protected getSearchOptions(options?: SearchOptions) {
        let value = '';
        if (options) {
            const result: string[] = [];
            if (options.fields) {
                result.push('fields=' + encodeURIComponent(options.fields.join(',')))
            }
            if (options.limit !== undefined) {
                result.push('limit=' + encodeURIComponent(options.limit))
            }
            if (options.page !== undefined) {
                result.push('page=' + encodeURIComponent(options.page))
            }
            if (options.orderBy) {
                const order = options.order === 'DESC' ? '-' : '+'
                result.push('sort=' + order + encodeURIComponent(options.orderBy.join(',')));
            }
            if (options.expand !== undefined) {
                result.push('expand=' + encodeURIComponent(options.expand))
            }
            if (options.query) {
                for (const key of Object.keys(options.query)) {
                    result.push(key + '=' + encodeURIComponent(options.query[key]))
                }
            }
            if (options.all !== undefined) {
                result.push('all=' + encodeURIComponent(String(options.all)))
            }
            value += '?' + result.join('&');
        }
        return value;
    }

    protected get<T>(url: string, options?: RestOptions): Promise<HttpResponse<T>> {
        return new Promise((resolve, reject) => {
            const headers = this.getHeaders(options);
            url = Rest.API_URL + url + this.getQuery(options);
            this.httpClient.get<HttpResponse<T>>(url, { headers }).subscribe({
                next: (response) => {
                    resolve(response);
                },
                error: (error) => {
                    reject(error.error);
                }
            });
        });
    }

    protected post<T>(url: string, body: any, options?: RestOptions): Promise<HttpResponse<T>> {
        return new Promise((resolve, reject) => {
            const headers = this.getHeaders(options);
            url = Rest.API_URL + url + this.getQuery(options);;
            this.httpClient.post<HttpResponse<T>>(url, body, { headers }).subscribe({
                next: (response) => {
                    resolve(response);
                },
                error: (error) => {
                    reject(error.error);
                }
            });
        });
    }

    protected put<T>(url: string, body: any, options?: RestOptions): Promise<HttpResponse<T>> {
        return new Promise((resolve, reject) => {
            const headers = this.getHeaders(options);
            url = Rest.API_URL + url + this.getQuery(options);;
            this.httpClient.put<HttpResponse<T>>(url, body, { headers }).subscribe({
                next: (response) => {
                    resolve(response);
                },
                error: (error) => {
                    reject(error.error);
                }
            });
        });
    }

    protected delete<T>(url: string, options?: RestOptions): Promise<HttpResponse<T>> {
        return new Promise((resolve, reject) => {
            const headers = this.getHeaders(options);
            url = Rest.API_URL + url + this.getQuery(options);
            this.httpClient.delete<HttpResponse<T>>(url, { headers }).subscribe({
                next: (response) => {
                    resolve(response);
                },
                error: (error) => {
                    reject(error.error);
                }
            });
        });
    }



    private getQuery(options?: RestOptions) {
        let queryStr = '';
        if (options && options.query && Object.keys(options.query).length > 0) {
            queryStr += '?';
            let nParam = 0;
            for (const queryField of Object.keys(options.query)) {
                if (nParam === 0) {
                    queryStr += queryField + '=' + options.query[queryField];
                } else {
                    queryStr += '&' + queryField + '=' + options.query[queryField];
                }
                nParam++;
            }
        }
        return queryStr;
    }

    private getHeaders(options?: RestOptions): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.set(API_KEY_HEADER, environment.apiKey);
        if (options) {
            if (options.authorization) {
                headers = headers.set(AUTHORIZATION_HEADER, options.authorization);
            }
            if (options.jsonBody) {
                headers = headers.set(CONTENT_TYPE_HEADER, CONTENT_TYPE_JSON);
            }
        }
        return headers;
    }

}

