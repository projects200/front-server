import {
  createChatroomUrl,
  readChatroomUrl,
  readMemberChatroomUrl,
  updateChatroomUrl,
} from '@/api/openChat'
import {
  adapterChatroomUrl,
  adapterChatroom,
} from '@/lib/adapters/openChat.adapter'
import { ChatroomUrl, ChatroomId, Chatroom } from '@/types/openChat'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

// 오픈 채팅 URL 생성
export const usePostChatroomUrl = () =>
  useApiMutation<ChatroomId, ChatroomUrl>(
    ['openChat/url'],
    (token, body) => createChatroomUrl(token, body),
    {
      revalidate: true,
    },
  )

// 나의 오픈 채팅 URL 조회
export const useReadChatroomUrl = () =>
  useApiGet<Chatroom>(
    ['openChat/url'],
    (token) => readChatroomUrl(token).then(adapterChatroom),
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

// 오픈 채팅 URL 수정
export const usePatchChatroomUrl = () =>
  useApiMutation<ChatroomId, Chatroom>(
    ['openChat/url'],
    (token, body) => updateChatroomUrl(token, body),
    {
      revalidate: true,
    },
  )
