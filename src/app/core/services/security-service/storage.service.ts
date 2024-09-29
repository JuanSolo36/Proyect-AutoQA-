import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser: boolean;

  private isValidJSON(item: string): boolean {
    try {
      JSON.parse(item);
      return true;
    } catch (error) {
      return false;
    }
  }  

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public retrieve(key: string): any {
    if (this.isBrowser) {
      try {
        const item = sessionStorage.getItem(key);
        if (item && this.isValidJSON(item)) {
          return JSON.parse(item);
        } else {
          console.warn(`Item for key ${key} is not valid JSON:`, item);
          return item;
        }
      } catch (error) {
        console.error('Error al acceder a sessionStorage:', error);
        return null;
      }
    }
    return null;
  }

  public store(key: string, value: any): void {
    if (this.isBrowser) {
      try {
        const serializedValue = this.isValidJSON(value) ? value : JSON.stringify(value);
        sessionStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error('Error al guardar en sessionStorage:', error);
      }
    }
  }
}
