import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'ngx-newsboard',
  templateUrl: './news-board.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
	nb-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
  
      .dropdown {
        flex-basis: 30%;
        min-width: 220px;
      }
    }
    nb-card-body {
      padding-bottom: 0;
    }
  `],
})
export class NewsBoardComponent {

  settings = {
    hideHeader: false,
    hideSubHeader: true,
    actions: {
      columnTitle: '删除',
      add: false,
      edit: false,
      delete: false,
      custom: [],
      position: 'right', // left|right
    },
    columns: {
      id: {
        title: '编号',
        type: 'number'
      },
      name: {
        title: '名称',
        type: 'string'
      },
      file: {
        title: '文件名',
        type: 'string'
      },
      title: {
        title: '标题',
        type: 'string',
      },
      text: {
        title: '正文',
        type: 'string',
      },
      time: {
        title: '时间',
        type: 'string'
      }
    },
    noDataMessage: '没有数据',
  };
  
  source: LocalDataSource = new LocalDataSource();
  
  constructor(private service: SmartTableService, private modalService: NgbModal) {
    const data = this.service.getNewsBoardData();
    this.source.load(data);
  }
  
  pushNews() {
    const activeModal = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      container: 'nb-layout',
      size: 'lg',
    });
  }
}
