import { Component, OnInit,EventEmitter  } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { NewsService, Clerk,Depart,Dpart } from '../../../@core/data/news.service';
import { MDpartComponent } from '../mdpart/mdpart.component';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

@Component({
  selector: 'ngx-dpart',
  templateUrl: './dpart.component.html',
  styleUrls: ['./dpart.component.scss']
})
export class DpartComponent implements OnInit {
  
  public myDatePickerOptions: IMyDpOptions = {
     dateFormat: 'yyyy.mm.dd',
     showClearDateBtn:false,
  };
  public model: any;
  locale:string = 'zh-cn';

  settings = {
    hideHeader: false,
    hideSubHeader: true,
    actions: {
      columnTitle: '删除',
      add: false,
      edit: false,
      delete: true,
      custom: [],
      position: 'right', // left|right
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {

      Duty: {
        title: '值班编号',
        type: 'string'
      },
      Identifier: {
        title: '人员编号',
        type: 'string'
      },
      Name: {
        title: '人员名称',
        type: 'string'
      },
      Depart: {
        title: '部门名称',
        type: 'string'
      }

    },
    noDataMessage: '没有数据',
  };

  departs:Depart[];
  depart:Depart;
  defaultDepart:Depart;

  source: LocalDataSource = new LocalDataSource();
  isLoading:boolean = true;

  constructor(private http: HttpClient, private service: NewsService,
    private modalService: NgbModal) {
      this.defaultDepart = {
        Id:"",
        Identifier:"",
        Name:"还没有部门",
        DutyTime:""
      };
      service.changeDpart = new EventEmitter();
      service.changeDpart.subscribe((value:Dpart)=>{
        this.source.prepend(value);
      });
      var date = new Date();
      date.setTime(Date.now());
      this.departs = service.getDeparts();
      if (this.departs.length > 0) {
        this.depart = this.departs[0];
        date = new Date(this.depart.DutyTime);
      } else {
        this.depart = this.defaultDepart;
      }
      this.model = { date: 
        { year: date.getFullYear(), 
          month: date.getMonth(), 
          day: date.getDay() } };

      //var clerks = service.getClerks(this.depart.Identifier);
      //if (clerks.length > 0) {
      //  this.source.load(clerks);
      //}

      setTimeout(() => {
        this.isLoading = false;
      }, 500);
   }

  ngOnInit() {

	}
	
  pushDpart() {
    this.modalService.open(MDpartComponent, {
      backdrop: 'static',
      container: 'nb-layout'
    });
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('你确定要删除吗?')) {
      this.http.post('/api/dpart/deleteDpart', {
        "Id": event.data.Id,
        "Name": event.data.Name
      }).subscribe(res => {
        if (res) {
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }

  selectDepart(depart: Depart): void {
    this.depart = depart;
    var date = new Date(this.depart.DutyTime);
    this.model = { date: 
      { year: date.getFullYear(), 
        month: date.getMonth(), 
        day: date.getDay() } };
    //var clerks = this.service.getClerks(this.depart.Identifier);
    //if (clerks.length > 0) {
    //  this.source.load(clerks);
    //}
  }
  
  onDateChanged(event: IMyDateModel) {
    this.depart.DutyTime = new Date(event.jsdate).toLocaleDateString();
    this.http.post('/api/depart/ChangeDutyTime', {
      "Identifier": this.depart.Id,
      "DutyTime": this.depart.DutyTime
    }).subscribe(res => {
    });
  }
  
}
