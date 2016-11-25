import config from 'config';
// 定义菜单结构
const menu = [
  {
    id: 'Dashboard',
    name: '控制台',
    children: [
      {
        id: 'V1',
        name: '版本1',
        href: config.contextRoot + '/dashboard/v1'
      },
      {
        id: 'V2',
        name: '版本2',
        href: '/'
      }
    ]
  },
  {
    id: 'Products',
    name: '产品',
    href: '/product'
  }
];

export default menu;
