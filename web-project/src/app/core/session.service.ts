import { Injectable } from '@angular/core';


export interface SessionKey {
  value: string;
}
export const SessionKeys: { [prop: string]: SessionKey } = {
  user: { value: 'user' },
}

@Injectable()
export class SessionService {

  constructor() { }

  getItem(key: SessionKey): any {
    const item = sessionStorage.getItem(key.value);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: SessionKey, item: any): void {
    sessionStorage.setItem(key.value, typeof item === 'string' ? item : JSON.stringify(item));
  }

  hasItem(key: SessionKey): boolean {
    return sessionStorage.getItem(key.value) !== null;
  }

  clear(): void {
    sessionStorage.clear();
  }
}
