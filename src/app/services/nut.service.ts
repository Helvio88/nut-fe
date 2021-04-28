import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

import { NutFiles, NutGame, NutResponse, NutTitle } from '../definitions/nut'

@Injectable({
  providedIn: 'root'
})
export class NutService {
  constructor(private http: HttpClient) {}

  search(): Promise<NutGame[]> {
    if (environment.production) {
      return this.http.get<NutGame[]>('/api/search').toPromise()
    }
    return this.http.get<NutGame[]>('/assets/search.json').toPromise()
  }

  files(): Promise<NutFiles> {
    return this.http.get<NutFiles>('/api/files').toPromise()
  }

  titles(): Promise<NutTitle[]> {
    if (environment.production) {
      return this.http.get<NutTitle[]>('/api/titles').toPromise()
    }
    return this.http.get<NutTitle[]>('/assets/titles.json').toPromise()
  }

  info(titleId: string): Promise<NutTitle> {
    return this.http.get<NutTitle>(`/api/info/${titleId}`).toPromise()
  }

  scan(): Promise<NutResponse> {
    return this.http.get<NutResponse>('/api/scan').toPromise()
  }

  organize(): Promise<NutResponse> {
    return this.http.get<NutResponse>('/api/organize').toPromise()
  }
}
