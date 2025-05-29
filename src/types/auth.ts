export type Gender = 'M' | 'F' | 'U'

export type MemberInfo = {
  memberId: string
  memberEmail: string
  memberNickname: string
  memberDesc: string
  memberGender: Gender
  memberBday: string 
  memberScore: number
  memberCreatedAt: string 
}
