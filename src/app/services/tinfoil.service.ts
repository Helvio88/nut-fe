import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { TinfoilGame, TinfoilTitle } from '../definitions/tinfoil'

@Injectable({
  providedIn: 'root'
})
export class TinfoilService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://tinfoil.media/api'

  convertId(title: TinfoilGame | TinfoilTitle): string {
    return title.id.toString(16).toUpperCase().padStart(16, '0')
  }

  hot(): Promise<TinfoilGame[]> {
    if (environment.production) {
      return this.http.get<TinfoilGame[]>(`${this.baseUrl}/hot/nut`).toPromise()
    }
    return this.http.get<TinfoilGame[]>('/assets/hot.json').toPromise()
  }

  popular(): Promise<TinfoilGame[]> {
    if (environment.production) {
      return this.http
        .get<TinfoilGame[]>(`${this.baseUrl}/popular/nut`)
        .toPromise()
    }
    return this.http.get<TinfoilGame[]>('/assets/popular.json').toPromise()
  }

  patches(): Promise<TinfoilGame[]> {
    if (environment.production) {
      return this.http
        .get<TinfoilGame[]>(`${this.baseUrl}/patches/nut`)
        .toPromise()
    }
    return this.http.get<TinfoilGame[]>('/assets/patches.json').toPromise()
  }

  sale(): Promise<TinfoilGame[]> {
    if (environment.production) {
      return this.http
        .get<TinfoilGame[]>(`${this.baseUrl}/sale/nut`)
        .toPromise()
    }
    return this.http.get<TinfoilGame[]>('/assets/sale.json').toPromise()
  }

  recent(): Promise<TinfoilGame[]> {
    if (environment.production) {
      return this.http
        .get<TinfoilGame[]>(`${this.baseUrl}/recent/nut`)
        .toPromise()
    }
    return this.http.get<TinfoilGame[]>('/assets/recent.json').toPromise()
  }

  upcoming(): Promise<TinfoilGame[]> {
    if (environment.production) {
      return this.http
        .get<TinfoilGame[]>(`${this.baseUrl}/upcoming/nut`)
        .toPromise()
    }
    return this.http.get<TinfoilGame[]>('/assets/upcoming.json').toPromise()
  }

  similar(id: string): Promise<TinfoilTitle[]> {
    if (environment.production) {
      return this.http
        .get<TinfoilTitle[]>(`${this.baseUrl}/hot/nut/${id}`)
        .toPromise()
    }
    return this.http.get<TinfoilTitle[]>('/assets/similar.json').toPromise()
  }
}
