export default [
  {
    path: '/examples',
    name: 'holy-layout',
    component: () => import('Layouts/Layout.vue'),
    children: [
      {
        path: '',
        name: 'examples-home',
        redirect: '/todo'
      },
      {
        path: '/todo',
        name: 'examples-todo',
        component: () => import('Views/examples/Todo.vue'),
      },
      {
        path: '/pinia',
        name: 'examples-pinia',
        component: () => import('@/views/examples/Pinia.vue'),
      },
    ]
  }
];
