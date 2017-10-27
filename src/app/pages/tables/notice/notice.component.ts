import { Component, OnDestroy, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { NewsService, ImageNews } from '../../../@core/data/news.service';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'ngx-notice',
  styleUrls: ['./notice.component.scss'],
  templateUrl: './notice.component.html'
})
export class NoticeComponent implements OnDestroy {

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
      Title: {
        title: '标题',
        type: 'string'
      },
      Text: {
        title: '正文',
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
    this.loadImageNews();
    
    service.changeNotice = new EventEmitter();
    service.changeNotice.subscribe((value:ImageNews)=>{
      this.source.prepend(value);
    });
  }

  ngOnDestroy(): void {
    this.service.changeNotice.unsubscribe();
    this.service.changeNotice = undefined;
  }
  
  loadImageNews() {
    this.http.get('/api/news/getnoticelist').subscribe(res => {
      (res as ImageNews[]).forEach(i => {
        this.source.prepend(i);
      });
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
  }
  
  pushNews() {
    const activeModal = this.modalService.open(UploadComponent, {
      backdrop: 'static',
      container: 'nb-layout',
      size: 'lg',
    });
    activeModal.componentInstance.setUploadData(1);
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('你确定要删除吗?')) {
      this.http.post('/api/news/deleteNoticeNews', {
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
