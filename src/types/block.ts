export type BlockMemberId = {
  memberBlockId: number
}

export type BlockMemberList = BlockMemberId & {
  memberId: string
  nickname: string
  profileImageUrl: string | null
  thumbnailImageUrl: string | null
  blockedAt: string
}