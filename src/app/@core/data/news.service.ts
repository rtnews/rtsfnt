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
export class NewsService {
  changeHome: EventEmitter<ImageNews>;
  changeNotice: EventEmitter<ImageNews>;
  changeGlobal: EventEmitter<ImageNews>;
  
  constructor(){
    this.changeHome = new EventEmitter();
    this.changeNotice = new EventEmitter();
    this.changeGlobal = new EventEmitter();
  }
}
