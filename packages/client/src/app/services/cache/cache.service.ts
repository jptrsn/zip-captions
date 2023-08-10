import { Injectable } from '@angular/core';
import { SessionStorageSaveOptions } from '../../models/cache.model';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  save(options: SessionStorageSaveOptions) {
    // Set default values for optionals
    options.expirationMins = options.expirationMins || 0

    // Set expiration date in miliseconds
    const expirationMS = options.expirationMins !== 0 ? options.expirationMins * 60 * 1000 : 0

    const record = {
        value: typeof options.data === 'string' ? options.data : JSON.stringify(options.data),
        expiration: expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
        hasExpiration: expirationMS !== 0 ? true : false
    }
    sessionStorage.setItem(options.key, JSON.stringify(record))
  }

  load(key: string) {
      // Get cached data from sessionStorage
      const item = sessionStorage.getItem(key)
      if (item !== null) {
          const record = JSON.parse(item)
          const now = new Date().getTime()
          // Expired data will return null
          if (!record || (record.hasExpiration && record.expiration <= now)) {
              return null
          } else {
              return JSON.parse(record.value)
          }
      }
      return null
  }

  remove(key: string) {
      sessionStorage.removeItem(key)
  }

  cleansessionStorage() {
      sessionStorage.clear()
  }
}
