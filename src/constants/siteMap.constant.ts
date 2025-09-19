const SITE_MAP = {
  HOME: '/',
  SETTINGS: '/settings',

  LOGIN: '/auth/login',
  CALLBACK: '/auth/callback',
  AGREEMENT: '/auth/agreement',
  SIGHUP: '/auth/sign-up',
  PWA: '/auth/pwa',

  EXERCISE: '/exercise',
  EXERCISE_CREATE: '/exercise/create',
  EXERCISE_DETAIL: '/exercise/detail',
  EXERCISE_EDIT: '/exercise/edit',

  MATCH: '/match',
  MATCH_PLACES: '/match/places',

  TIMER_LIST: '/timer/list',
  TIMER_SIMPLE: '/timer/simple',
  TIMER_CUSTOM: '/timer/custom',
  TIMER_CREATE: '/timer/create',
  TIMER_EDIT: '/timer/edit',

  MYPAGE: '/mypage',
  MYPAGE_EDIT: '/mypage/edit',
  MYPAGE_PICTURES: '/mypage/pictures',
} as const
export default SITE_MAP
