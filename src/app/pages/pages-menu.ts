import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '机关新闻',
    icon: 'nb-home',
    children: [
      {
        title: '公安要闻',
        link: '/pages/tables/home',
        home: true
      },
      {
        title: '全局动态',
        link: '/pages/tables/global'
      }
    ]
  },
  {
    title: '机关日常',
    group: true,
  },
  {
    title: '今日值班',
    icon: 'nb-compose',
    link: '/pages/table/duty'
  },
  {
    title: '机关工作',
    icon: 'nb-gear',
    children: [
      {
        title: '通知通报',
        link: '/pages/tables/notice'
      },
      {
        title: '部门值班',
        link: '/pages/table/dpart'
      }
    ]
  },
  {
    title: '机关结构',
    icon: 'nb-bar-chart',
    children: [
      {
        title: '机关部门',
        link: '/pages/tables/depart'
      },
      {
        title: '部门人员',
        link: '/pages/tables/clerks'
      }
    ]
  },
];
