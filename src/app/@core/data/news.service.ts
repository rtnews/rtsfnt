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

export class NewsTmp {
    Id:string;
    Name:string;
    FileName:string;
    Time:string;
    Count:number;
}

export class Depart {
  Id:string;
  Identifier:string;
  Name:string;
}

@Injectable()
export class NewsService {
  changeHome: EventEmitter<ImageNews>;
  changeNotice: EventEmitter<ImageNews>;
  changeGlobal: EventEmitter<ImageNews>;
  changeNewsTmp: EventEmitter<NewsTmp>;
  changeDepart: EventEmitter<Depart>;
  
  constructor(){
    this.changeHome = new EventEmitter();
    this.changeNotice = new EventEmitter();
    this.changeGlobal = new EventEmitter();
    this.changeNewsTmp = new EventEmitter();
    this.changeDepart = new EventEmitter();
  }
  
}
