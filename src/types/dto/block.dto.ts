export type BlockMemberIdDto = {
  memberBlockId: number
}

export type BlockMemberListDto = BlockMemberIdDto & {
  memberId: string
  nickname: string
  profileImageUrl: string | null
  thumbnailImageUrl: string | null
  blockedAt: string
}
