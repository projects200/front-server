import {
  createChatroomUrl,
  readChatroomUrl,
  readMemberChatroomUrl,
} from '@/api/openChat'
import { adapterChatroomUrl } from '@/lib/adapters/openChat.adapter'
import { ChatroomUrl } from '@/types/openChat'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

// 오픈 채팅 URL 생성
export const usePostChatroomUrl = () =>
  useApiMutation<{ openChatroomId: number }, ChatroomUrl>(
    ['openChat/url'],
    (token, body) => createChatroomUrl(token, body),
    {
      revalidate: true,
    },
  )

// 나의 오픈 채팅 URL 조회
export const useReadChatroomUrl = () =>
  useApiGet<ChatroomUrl>(
    ['openChat/url'],
    (token) => readChatroomUrl(token).then(adapterChatroomUrl),
    {
      policy: {
        messages: { 404: null },
        actions: { 404: null },
      },
    },
  )

// 다른회원 오픈 채팅 URL 조회
export const useReadMemberChatroomUrl = (memberId: string) =>
  useApiGet<ChatroomUrl>(
    ['openChat/member/url', memberId],
    (token) => readMemberChatroomUrl(token, memberId).then(adapterChatroomUrl),
    {
      policy: {
        messages: { 404: null },
        actions: { 404: null },
      },
    },
  )
