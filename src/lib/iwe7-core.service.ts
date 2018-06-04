import { Iwe7DomService } from './iwe7-dom.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Iwe7CoreService {
  constructor(
    public dom: Iwe7DomService
  ) { }
}
