import { BlockMemberId, BlockMemberList } from '@/types/block'
import { BlockMemberIdDto, BlockMemberListDto } from '@/types/dto/block.dto'

export function adapterBlockMemberId(dto: BlockMemberIdDto): BlockMemberId {
  return {
    memberBlockId: dto.memberBlockId,
  }
}

export function adapterBlockMember(dto: BlockMemberListDto): BlockMemberList {
  return {
    memberBlockId: dto.memberBlockId,
    memberId: dto.memberId,
    nickname: dto.nickname,
    profileImageUrl: dto.profileImageUrl,
    thumbnailImageUrl: dto.thumbnailImageUrl,
    blockedAt: dto.blockedAt,
  }
}

export function adapterBlockMemberList(
  dtoList: BlockMemberListDto[],
): BlockMemberList[] {
  return dtoList.map((dto) => adapterBlockMember(dto))
}
