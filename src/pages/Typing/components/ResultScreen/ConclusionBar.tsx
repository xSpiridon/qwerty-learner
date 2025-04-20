import classNames from 'classnames'
import type { ElementType, SVGAttributes } from 'react'
import IconExclamationTriangle from '~icons/heroicons/exclamation-triangle-solid'
import IconHandThumbUp from '~icons/heroicons/hand-thumb-up-solid'
import IconHeart from '~icons/heroicons/heart-solid'

type IconMapper = {
  icon: ElementType<SVGAttributes<SVGSVGElement>>
  className: string
  text: (mistakeCount: number) => string
}

const ICON_MAPPER: IconMapper[] = [
  {
    icon: IconHeart,
    className: 'text-indigo-600',
    text: (mistakeCount: number) => `Performance is good! ` + (mistakeCount > 0 ? `Only ${mistakeCount} words wrong!` : 'All right!'),
  },
  {
    icon: IconHandThumbUp,
    className: 'text-indigo-600',
    text: () => 'There were some minor issues oh which could be done better next time!',
  },
  {
    icon: IconExclamationTriangle,
    className: 'text-indigo-600',
    text: () => 'Too many mistakes. How about another one?',
  },
]

const ConclusionBar = ({ mistakeLevel, mistakeCount }: ConclusionBarProps) => {
  const { icon: Icon, className, text } = ICON_MAPPER[mistakeLevel]

  return (
    <div className="flex h-10 flex-row items-center">
      <Icon className={classNames(className, 'h-5 w-5')} />
      <span className="ml-2 inline-block align-middle text-sm font-medium leading-10 text-gray-700 sm:text-sm md:text-base">
        {text(mistakeCount)}
      </span>
    </div>
  )
}

export type ConclusionBarProps = {
  mistakeLevel: number
  mistakeCount: number
}

export default ConclusionBar
