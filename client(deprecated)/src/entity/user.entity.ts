import { baseConfig } from './../axios/axios'
import { Axios } from './../axios/axios'

const userConnection = new Axios(baseConfig)

// Define la entidad del frontend
export interface UserEntity {
  id: number
  createdAt: Date
  updatedAt: Date
  email: string
  hashedPassword: string
  firstName: string
  lastName: string
  openToWork: boolean
  avatar?: string | null
  country?: string | null
  githubUser?: string | null
  ranking?: number | null
  points?: number
  tag?: any //
  rol?: any //
  projectsCreated?: any[] //
  projectsCollaborated?: any[] //
  leadingTeams?: any[] //
  memberOfTeams?: any[] //
  asignedToTasks?: any[] //
  teamId?: number | null //
}

export class User {
  userData?: any

  constructor(token: string) {
    userConnection.assignToken(token)
    userConnection
      .getUserData()
      .then((data) => {
        this.userData = data
      })
      .catch((err) => console.error(err))
  }
  async updateMe() {
    return await userConnection.getUserData()
  }
}
