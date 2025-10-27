const SITE_MAP = {
  HOME: '/',

  SETTINGS: '/settings',
  SETTINGS_ALERT: '/settings/alert',
  SETTINGS_BLOCK: '/settings/block',

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
  MATCH_OPEN_CHAT_CREATE: '/match/open-chat-create',
  MATCH_PLACE_LIST: '/match/place-list',
  MATCH_PLACE_REGISTER_SEARCH: '/match/place-register-search',
  MATCH_PLACE_REGISTER_DETAIL: '/match/place-register-detail',
  MATCH_PLACE_REGISTER_EDIT: '/match/place-register-edit',
  MATCH_PROFILE: 'match/profile',

  CHAT: '/chat',
  CHAT_ROOM: '/chat/room',

  TIMER_LIST: '/timer/list',
  TIMER_SIMPLE: '/timer/simple',
  TIMER_CUSTOM: '/timer/custom',
  TIMER_CREATE: '/timer/create',
  TIMER_EDIT: '/timer/edit',

  MYPAGE: '/mypage',
  MYPAGE_EDIT: '/mypage/edit',
  MYPAGE_PICTURES: '/mypage/pictures',
  MYPAGE_OPEN_CHAT_CREATE: '/mypage/open-chat-create',
  MYPAGE_OPEN_CHAT_EDIT: '/mypage/open-chat-edit',
} as const
export default SITE_MAP
