import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '公安要闻',
    icon: 'nb-home',
    link: '/pages/tables/newsboard',
    home: true,
  },
  {
    title: '机关工作',
    icon: 'nb-keypad',
    children: [
      {
        title: '通知通报',
        link: '/pages/tables/notices',
      },
      {
        title: '全局动态',
        link: '/pages/tables/wnews',
      }
    ],
  },
  {
    title: '今日值班',
    icon: 'nb-compose',
    link: '/pages/onduty',
  }
];
