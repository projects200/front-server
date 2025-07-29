export type PolicyAttribute = {
  policyKey: string
  policyValue: string
  policyUnit: string
  policyDescription: string
}

export type ExercisePolicyDto = {
  groupName: string
  size: number
  policies: PolicyAttribute[]
}
