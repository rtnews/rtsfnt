import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-wnews',
  templateUrl: './wnews.component.html',
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
export class WnewsComponent {

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
        type: 'number',
        width: '150px'
      },
      title: {
        title: '标题',
        type: 'string',
      },
      time: {
        title: '时间',
        type: 'string',
        width: '250px'
      }
    },
    noDataMessage: '没有数据',
  };
  
  source: LocalDataSource = new LocalDataSource();
  
  constructor(private service: SmartTableService) {
    //const data = this.service.getWnewsData();
    //this.source.load(data);
  }
  
  pushNews() {
  }
}
