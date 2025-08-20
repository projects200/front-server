const SITE_MAP = {
  HOME: '/',
  LOGIN: '/auth/login',
  AGREEMENT: '/auth/agreement',
  SIGHUP: '/auth/sign-up',
  SETTINGS: '/settings',

  EXERCISE: '/exercise',
  EXERCISE_CREATE: '/exercise/create',
  EXERCISE_DETAIL: '/exercise/detail',
  EXERCISE_EDIT: '/exercise/edit',

  TIMER_LIST: '/timer/list',
  TIMER_SIMPLE: '/timer/simple',
  TIMER_CUSTOM: '/timer/custom',
  TIMER_CREATE: '/timer/create',
  TIMER_EDIT: '/timer/edit',
} as const
export default SITE_MAP
