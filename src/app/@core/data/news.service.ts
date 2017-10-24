import { Injectable,EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

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

export class Clerk {
  Id:string;
  Identifier:string;
  Name:string;
  Depart:string;
}

export class DepartList {
  Departs:Depart[];
  Clerks:Clerk[];
}

@Injectable()
export class NewsService {

  departs: Depart[];
  clerks: Clerk[];

  changeHome: EventEmitter<ImageNews>;
  changeNotice: EventEmitter<ImageNews>;
  changeGlobal: EventEmitter<ImageNews>;
  changeNewsTmp: EventEmitter<NewsTmp>;
  changeDepart: EventEmitter<Depart>;
  changeClerk: EventEmitter<Clerk>;
  
  constructor(private http: HttpClient){
    this.changeHome = new EventEmitter();
    this.changeNotice = new EventEmitter();
    this.changeGlobal = new EventEmitter();
    this.changeNewsTmp = new EventEmitter();
    this.changeDepart = new EventEmitter();
    this.changeClerk = new EventEmitter();
    
    this.loadDeparts();
  }
  
  loadDeparts() {
    this.http.get('/api/depart/getdepartlist').subscribe(res => {
      var departList = res as DepartList;
      this.departs = departList.Departs;
      this.clerks = departList.Clerks;
    });
  }

  deleteDepart(id:string) {
    this.departs.filter(i => i.Id = id);
  }

  getDeparts() {
    return this.departs;
  }
  
  getClerks(name:string) {
    return this.clerks.filter(i => i.Depart == name);
  }

}
