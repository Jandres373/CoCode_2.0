import Navbar from '@/components/layout/navbar/Navbar'
import { getServerSession } from 'next-auth'
import React from 'react'
import authOptions from './api/auth/[...nextauth]/authOptions'
import { ProjectCard } from '@/components/layout/card/client'
import { RecommendedCard } from '../components/layout/card/client/recommended';

const Page = async () => {
  // ## Constants
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <div className="h-min-content">
      <Navbar user={user} />
      <section className='w-full h-full flex flex-col justify-center items-center gap-20'>
      <ProjectCard></ProjectCard>
      <RecommendedCard />
      </section>
    </div>
  )
}

export default Page
