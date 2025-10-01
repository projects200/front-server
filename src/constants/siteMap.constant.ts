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
  MATCH_PLACE_LIST: '/match/place-list',
  MATCH_PLACE_REGISTER_SEARCH: '/match/place-register-search',
  MATCH_PLACE_REGISTER_DETAIL: '/match/place-register-detail',
  MATCH_PROFILE: 'match/profile',

  TIMER_LIST: '/timer/list',
  TIMER_SIMPLE: '/timer/simple',
  TIMER_CUSTOM: '/timer/custom',
  TIMER_CREATE: '/timer/create',
  TIMER_EDIT: '/timer/edit',

  MYPAGE: '/mypage',
  MYPAGE_EDIT: '/mypage/edit',
  MYPAGE_PICTURES: '/mypage/pictures',
  MYPAGE_OPEN_CHAT: '/mypage/open-chat'
} as const
export default SITE_MAP
