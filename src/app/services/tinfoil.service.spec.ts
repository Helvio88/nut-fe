import { TestBed } from '@angular/core/testing'

import { TinfoilService } from './tinfoil.service'

describe('TinfoilService', () => {
  let service: TinfoilService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TinfoilService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
