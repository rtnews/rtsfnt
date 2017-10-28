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
  DutyTime:string;
}

export class Clerk {
  Id:string;
  Identifier:string;
  Name:string;
  Depart:string;
  Icon:string;
  Phone:string;
}

export class Dpart {
  Id:string;
  Identifier:number;
  ClerkId:string;
  Name:string;
  Depart:string;
}

export class DepartList {
  Departs:Depart[];
  Clerks:Clerk[];
  Dparts:Dpart[];
}

@Injectable()
export class NewsService {

  departs: Depart[];
  clerks: Clerk[];
  dparts: Dpart[];

  changeHome: EventEmitter<ImageNews>;
  changeNotice: EventEmitter<ImageNews>;
  changeGlobal: EventEmitter<ImageNews>;
  changeNewsTmp: EventEmitter<NewsTmp>;
  changeDepart: EventEmitter<Depart>;
  changeClerk: EventEmitter<Clerk>;
  changeDpart: EventEmitter<Dpart>;
  
  constructor(private http: HttpClient){
    this.changeHome = undefined;
    this.changeNotice = undefined;
    this.changeGlobal = undefined;
    this.changeNewsTmp = undefined;
    this.changeDepart = undefined;
    this.changeClerk = undefined;
    this.changeDpart = undefined;
    
    this.loadDeparts();
  }
  
  loadDeparts() {
    this.http.get('/api/depart/getdepartlist').subscribe(res => {
      var departList = res as DepartList;
      this.departs = departList.Departs;
      this.clerks = departList.Clerks;
      this.dparts = departList.Dparts;
    });
  }

  pushDepart(depart:Depart) {
    if (this.changeDepart !== null && this.changeDepart !== undefined) {
      this.changeDepart.emit(depart);
    }
    this.departs.push(depart);
  }

  canDelDepart(name:string) {
    if ( this.clerks.findIndex(i => i.Depart == name) !== -1) {
      return false;
    }
    if ( this.dparts.findIndex(i => i.Depart == name) !== -1) {
      return false;
    }
    return true;
  }

  deleteDepart(id:string) {
    this.departs = this.departs.filter(i => i.Id !== id);
  }

  findDepartById(id:string) {
    return this.departs.find(i => i.Id == id);
  }

  getDeparts() {
    return this.departs;
  }
  
  pushClerks(clerk:Clerk) {
    if (this.changeClerk !== null && this.changeClerk !== undefined) {
      this.changeClerk.emit(clerk);
    }
    this.clerks.push(clerk);
  }

  deleteClerk(id:string) {
    this.clerks = this.clerks.filter(i => i.Id !== id);
  }

  getClerks(name:string) {
    return this.clerks.filter(i => i.Depart == name);
  }

  getAllClerks() {
    return this.clerks;
  }

  pushDpart(dpart:Dpart) {
    if (this.changeDpart !== null && this.changeDpart !== undefined) {
      this.changeDpart.emit(dpart);
    }
    this.dparts.push(dpart);
  }

  deleteDpart(id:string) {
    this.dparts = this.dparts.filter(i => i.Id !== id);
  }

  getDparts(name:string) {
    return this.dparts.filter(i => i.Depart == name);
  }

}
