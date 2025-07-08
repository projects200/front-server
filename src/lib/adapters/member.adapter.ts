import { MemberScore } from '@/types/member'
import { MemberSocreDto } from '@/types/dto/member'

export function adaptMemberScore(dto: MemberSocreDto): MemberScore {
  return {
    memberId: dto.memberId,
    memberScore: dto.memberScore,
  }
}
