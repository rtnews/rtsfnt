import { Injectable,EventEmitter } from '@angular/core';

export class ImageNews {

  Id:string;
  Name:string;
  FileName:string;
  Title:string;
  Text:string;
  Time:string;
  Read:number;
  Count:number;

}

@Injectable()
export class SmartTableService {
  changeBoard: EventEmitter<ImageNews>;
  changeNotice: EventEmitter<ImageNews>;
  changeGlob: EventEmitter<ImageNews>;
  
  constructor(){
    this.changeBoard = new EventEmitter();
    this.changeNotice = new EventEmitter();
    this.changeGlob = new EventEmitter();
  }
}
