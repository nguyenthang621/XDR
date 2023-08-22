interface Props {
  title: string
  onBack: any
  iconBack: any
}
function Header({ title, onBack, iconBack }: Props) {
  return (
    <div
      className='text-sx inline flex cursor-pointer items-center font-normal text-gray-500 dark:text-gray-400'
      onClick={() => onBack()}
    >
      <span className='icon_back'>{iconBack}</span>
      <span>{title}</span>
    </div>
  )
}

export default Header
