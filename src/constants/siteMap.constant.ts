const SITE_MAP = {
  HOME: '/',

  LOGIN: '/auth/login',
  CALLBACK: '/auth/callback',
  AGREEMENT: '/auth/agreement',
  SIGHUP: '/auth/sign-up',
  PWA: '/auth/pwa',

  EXERCISE: '/exercise',
  EXERCISE_CREATE: '/exercise/create',
  EXERCISE_DETAIL: '/exercise/detail',
  EXERCISE_EDIT: '/exercise/edit',

  TIMER_LIST: '/timer/list',
  TIMER_SIMPLE: '/timer/simple',
  TIMER_CUSTOM: '/timer/custom',
  TIMER_CREATE: '/timer/create',
  TIMER_EDIT: '/timer/edit',

  SETTINGS: '/settings',
  MYPAGE: '/mypage',
  MYPAGE_EDIT: '/mypage/edit',
} as const
export default SITE_MAP
