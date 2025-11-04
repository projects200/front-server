import { BlockMemberId, BlockMemberList } from '@/types/block'
import { fetchWrapper } from '@/utils/fetchWrapper'

// 회원 차단
export function createBlockMember(
  token: string,
  data: { memberId: string },
): Promise<BlockMemberId> {
  return fetchWrapper<BlockMemberId>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/members/${data.memberId}/block`,
    {
      method: 'POST',
    },
    token,
  )
}

// 차단 회원 조회
export function readBlockMember(token: string): Promise<BlockMemberList[]> {
  return fetchWrapper<BlockMemberList[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/members/blocks`,
    {
      method: 'GET',
    },
    token,
  )
}

// 회원 차단 해제
export function deleteBlockMember(
  token: string,
  data: { memberId: string },
): Promise<void> {
  return fetchWrapper<void>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/members/${data.memberId}/block`,
    {
      method: 'DELETE',
    },
    token,
  )
}