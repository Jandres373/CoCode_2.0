'use client'

import { Avatar } from 'keep-react'
import { NavbarProps } from '..'

//? Avatar del usuario
export const AvatarArea: React.FC<{ user: NavbarProps['user'] }> = ({
  user,
}) => {
  return (
    <Avatar
      shape="circle"
      size="md"
      status="online"
      statusPosition="bottom-right"
      img={user?.avatar}
    />
  )
}
