export interface User{
    firstName: string,
    lastName: string,
    username: string,
    password: string
}

export interface Account extends User{
    id: number,
    avatar: string,
    bio: string,
    followers: Account[],
    followings: Account[],
    isAccountPrivate: boolean,
    posts: [],
    system: string,
}

export interface Context{
    user: Account,
    setUser: (user: Account) => void
}