import { Component, OnInit, OnDestroy,EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { NewsService, NewsTmp } from '../../../@core/data/news.service';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'ngx-newstmp',
  templateUrl: './newstmp.component.html',
  styleUrls: ['./newstmp.component.scss']
})
export class NewsTmpComponent implements OnInit, OnDestroy {
  
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
      FileName: {
        title: '文件名',
        type: 'string'
      },
      Time: {
        title: '时间',
        type: 'string'
      }
    },
    noDataMessage: '没有数据',
  };
  
  source: LocalDataSource = new LocalDataSource();
  isLoading:boolean = true;
  
  constructor(private http: HttpClient, private service: NewsService, private modalService: NgbModal) {
    this.loadNewsTmp();
    service.changeNewsTmp = new EventEmitter();
    service.changeNewsTmp.subscribe((value:NewsTmp)=>{
      this.source.prepend(value);
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.service.changeNewsTmp !== undefined && 
      this.service.changeNewsTmp !== null) {
        this.service.changeNewsTmp.unsubscribe();
        this.service.changeNewsTmp = undefined;
      }
  }
  
  loadNewsTmp() {
    this.http.get('/api/template/getnewstmplist').subscribe(res => {
      (res as NewsTmp[]).forEach(i => {
        this.source.prepend(i);
      });
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
  }
  
  pushNewsTmp() {
    const activeModal = this.modalService.open(UploadComponent, {
      backdrop: 'static',
      container: 'nb-layout',
      size: 'lg',
    });
    activeModal.componentInstance.setUploadData(3);
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('你确定要删除吗?')) {
      this.http.post('/api/template/deleteNewsTmp', {
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
}
