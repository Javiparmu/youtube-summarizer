import React, { BaseHTMLAttributes } from 'react'
import * as icons from '@/icons/icons'

export type Icons = keyof typeof icons
export interface IconProps extends BaseHTMLAttributes<HTMLSpanElement> {
  icon: Icons
  className?: string
  iconClassName?: string
}

export const Icon = ({ icon, className = undefined, iconClassName = undefined, ...props }: IconProps) => {
  const IconComponent = icons[icon]
  return (
    <span className={className} {...props}>
      <IconComponent className={iconClassName} />
    </span>
  )
}
