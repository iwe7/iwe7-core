import { Iwe7DomService } from './iwe7-dom.service';
import { Injectable } from '@angular/core';
import { Iwe7Platform } from './iwe7-platform';

@Injectable({
  providedIn: 'root'
})
export class Iwe7CoreService {
  constructor(
    public platform: Iwe7Platform,
    public dom: Iwe7DomService
  ) { }
}
