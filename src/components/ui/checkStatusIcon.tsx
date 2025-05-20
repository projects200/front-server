import CheckedIcon from '@/assets/icon_checked.svg'
import UncheckedIcon from '@/assets/icon_unchecked.svg'

interface Props {
  checked: boolean
  className?: string
}

const CheckStatusIcon = ({ checked, className }: Props) => {
  return checked ? (
    <CheckedIcon className={className} width={24} height={24} />
  ) : (
    <UncheckedIcon className={className} width={24} height={24} />
  )
}

export default CheckStatusIcon
