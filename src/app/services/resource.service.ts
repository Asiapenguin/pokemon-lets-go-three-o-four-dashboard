import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Resource } from '../models/resource';
import { UrlService } from '../services/url.service';
import { GetQuery, SearchQuery } from "./resource-queries.service";

/**
 * Metadata on response
 */
export interface ResponseMeta {
  count?: number;
}

/**
 * List Response for list, search and their equivalent builder method (findAll, findWhere)
 */
export interface ListResponse<T> {
  data?: Array<T>;
  meta?: ResponseMeta;
}

/**
 * Base ResourceService. This allows us to map the following functions to the api endpoint
 * list() to GET /resource
 * get(id) to GET /resource/id
 * create(resource) to POST /resource
 * update(resource) to PUT /resource/id
 * delete(resource) to DELETE /resource/id
 */
export class ResourceService {
  apiUrl: string;
  http: HttpClient;
  private observable = new Subject();

  constructor(private injector: Injector, private modelClass: any) {
    this.http = injector.get(HttpClient);
    const urlService = injector.get(UrlService);
    this.apiUrl = urlService.getEndpoint().concat(modelClass.resourcePath);
  }

  /**
   * Utilities
   */
  generateIndex<T extends Resource>(data: Array<T>): { [id: number]: T } {
    const index: { [id: number]: T } = {};
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      index[item.id] = item;
    }
    return index;
  }

  /**
   * For cross component communication
   */
  getObservable(): Observable<any> {
    return this.observable.asObservable();
  }

  broadcast<T extends Resource>(data: T) {
    this.observable.next(data);
  }

  /**
   * Utilities
   */
  equals<T extends Resource>(data: T, jsonString: string) {
    return JSON.stringify(data) === jsonString;
  }

  /**
   * Maps to GET on /resource
   * @param params other http params to append
   */
  list<T extends Resource>(params?: HttpParams, headers?: HttpHeaders): Promise<ListResponse<T>> {
    return new Promise((res, rej) => {
      this.http.get(this.apiUrl, { params, headers }).subscribe(
        (result: ListResponse<T>) => {
          res(this.generateListResponse(result));
        },
        err => {
          rej(err);
        }
      );
    });
  }

  /**
   * Alternate API to do GET on /resource?<params>
   */
  findAll<T extends Resource>(): GetQuery<T> {
    return new GetQuery<T>(this.list.bind(this));
  }

  /**
   * Maps to GET on /resource/:id
   * @param id resource's id
   * @param params other http params to append
   */
  get<T extends Resource>(
    id: number | string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Promise<T> {
    return new Promise((res, rej) => {
      this.http.get(this.apiUrl + '/' + id, { params, headers }).subscribe(
        (data: T) => {
          const item = new this.modelClass();
          Object.assign(item, data);
          res(item);
        },
        err => {
          rej(err);
        }
      );
    });
  }

  /**
   * Alternate API to do GET on /resource/:id?<params>
   * @param id resource's id
   */
  findById<T extends Resource>(id: number | string): GetQuery<T> {
    return new GetQuery<T>(this.get.bind(this)).id(id);
  }

  /**
   * Maps to POST on /resource
   * Resolves the created object on success
   * @param resource resource to create on the back-end
   */
  create<T extends Resource>(resource: T, headers?: HttpHeaders): Promise<T> {
    return new Promise((res, rej) => {
      this.http.post(this.apiUrl, resource).subscribe(
        (data: T) => {
          Object.assign(resource, data);
          res(resource);
        },
        err => {
          rej(err);
        }
      );
    });
  }

  /**
   * Maps to PUT on /resource/:id
   * Resolves to true on success
   * @param resource resource to update
   */
  update<T extends Resource>(resource: T, headers?: HttpHeaders): Promise<T> {
    return new Promise((res, rej) => {
      this.http.put(this.apiUrl + '/' + resource.id, resource).subscribe(
        (data: T) => {
          Object.assign(resource, data);
          res(resource);
        },
        err => {
          rej(err);
        }
      );
    });
  }

  /**
   * Maps to PUT on /resource/:id
   * Resolves to true on success
   * @param resource resource to patch
   */
  patch<T extends Resource>(resource: T, headers?: HttpHeaders): Promise<T> {
    return new Promise((res, rej) => {
      this.http.patch(this.apiUrl + '/' + resource.id, resource).subscribe(
        (data: T) => {
          Object.assign(resource, data);
          res(resource);
        },
        err => {
          rej(err);
        }
      );
    });
  }

  /**
   * Maps to DELETE on /resource/:id
   * Resolves to true on success
   * @param resource resource to remove
   */
  remove<T extends Resource>(resource: T, headers?: HttpHeaders): Promise<T> {
    return new Promise((res, rej) => {
      this.http.delete(this.apiUrl + '/' + resource.id).subscribe(
        (data: T) => {
          res(resource);
        },
        err => {
          rej(err);
        }
      );
    });
  }

  /**
   * Search API. Maps to GET /resource/search?field=value using HttpParams
   * @param searchParams HttpParams to pass
   */
  search<T extends Resource>(
    searchParams: HttpParams,
    method: 'get' | 'delete' | 'patch' = 'get',
    resource?: T,
    headers?: HttpHeaders
  ): Promise<ListResponse<T>> {
    return new Promise((res, rej) => {
      let httpCall = null;

      const opts = { params: searchParams, headers };

      if (method === 'patch') {
        httpCall = this.http[method](this.apiUrl + '/search', resource, opts);
      } else {
        // get | delete
        httpCall = this.http[method](this.apiUrl + '/search', opts);
      }

      httpCall.subscribe(
        (result: ListResponse<T>) => {
          res(this.generateListResponse(result));
        },
        err => {
          rej(err);
        }
      );
    });
  }

  /**
   * Alternate Search API. Maps to GET /resource/search?field=value
   * Use by doing resourceService.findWhere(field, value).andWhere(field, value).get().then(data, err);
   */
  findWhere<T extends Resource>(
    field: string,
    value: number | string | Array<number | string>
  ): SearchQuery<T> {
    return new SearchQuery<T>(field, value, this.search.bind(this));
  }

  /**
   * upload does a POST to resource/upload with FormData
   * @param formData formData to upload
   */
  upload<T extends Resource>(
    formData: FormData,
    headers?: HttpHeaders
  ): Promise<T | ListResponse<T>> {
    return new Promise((res, rej) => {
      this.http.post(this.apiUrl + '/upload', formData, { headers }).subscribe(
        (data: T | ListResponse<T>) => {
          res(data);
        },
        err => {
          rej(err);
        }
      );
    });
  }

  /**
   * uploadFor does a POST to resource/:id/upload with FormData
   * @param resource resource to attach files to
   * @param formData formData to upload
   */
  uploadFor<T extends Resource>(
    resource: T,
    formData: FormData,
    headers?: HttpHeaders
  ): Promise<T | ListResponse<T>> {
    return new Promise((res, rej) => {
      this.http.post(this.apiUrl + '/' + resource.id + '/upload', formData, { headers }).subscribe(
        (data: T | ListResponse<T>) => {
          res(data);
        },
        err => {
          rej(err);
        }
      );
    });
  }

  private generateListResponse<T extends Resource>(result): ListResponse<T> {
    if (result.data) {
      const items: Array<T> = [];
      for (const row of result.data) {
        const item = new this.modelClass();
        Object.assign(item, row);
        items.push(item);
      }
      result.data = items;
    }
    return result;
  }
}
