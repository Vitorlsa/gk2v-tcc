import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  nullOrUndef(obj) {
    return obj === undefined || obj == null;
  }

  nullOrUndefOrEmpty(obj) {
    return obj === undefined || obj == null || obj === "";
  }

}
