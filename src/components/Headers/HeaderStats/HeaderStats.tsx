interface Props {
  currentPath: string
}

export default function HeaderStats({ currentPath }: Props) {
  return (
    <>
      {/* Header */}
      <div className='relative pb-24 pt-12 md:pt-28'>
        <div className='mx-auto w-full px-4 md:px-10'>
          <div>{/* Card stats */}</div>
        </div>
      </div>
    </>
  )
}
