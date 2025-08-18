import { MemberScore } from '@/types/member'
import { MemberSocreDto } from '@/types/dto/member.dto'

export function adaptMemberScore(dto: MemberSocreDto): MemberScore {
  return {
    memberId: dto.memberId,
    memberScore: dto.memberScore,
    maxScore: dto.policyMaxScore,
    minScore: dto.policyMinScore,
  }
}
