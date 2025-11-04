import {
  createBlockMember,
  readBlockMember,
  deleteBlockMember,
} from '@/api/block'
import { BlockMemberId, BlockMemberList } from '@/types/block'
import {
  adapterBlockMemberId,
  adapterBlockMemberList,
} from '@/lib/adapters/block.adapter'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

// 회원 차단
export const usePostBlockMember = () =>
  useApiMutation<BlockMemberId, { memberId: string }>(
    ['blockMember/list'],
    (token, body) => createBlockMember(token, body).then(adapterBlockMemberId),
    {},
  )

// 차단 회원 조회
export const useReadBlockMemberList = () =>
  useApiGet<BlockMemberList[]>(
    ['blockMember/list'],
    (token) => readBlockMember(token).then(adapterBlockMemberList),
    {},
  )

// 회원 차단 해제
export const useDeleteBlockMember = () =>
  useApiMutation<void, { memberId: string }>(
    ['blockMember/list'],
    (token, body) => deleteBlockMember(token, body),
    {},
  )
