import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) as string);
    } catch(e: any) {
      console.error(`Failed to retrieve from storage: ${e.message}`)
      return {};
    }
  }
  
  set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch(e: any) {
      console.error(`Failed to set in storage: ${key}, ${value}`)
    }
  }

  update(key: string, property: string, value: any): void {
    const fromStorage: any = this.get(key) || {};
    fromStorage[property] = value;
    this.set(key, fromStorage);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
