export interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface Follower {
  
}

export interface Posts {
  id: number;
  authorId: number;
  title: string;
  description: string;
  postImage: string;
  tags: string[];
  location: string;
}

export interface Account extends User {
  id: number;
  avatar: string;
  bio: string;
  followers: Account[];
  followings: Account[];
  isAccountPrivate: boolean;
  posts: [];
  system: string;
}

export interface Context {
  user: Account;
  setUser: (user: Account) => void;
}


export const Base = "http:/localhost/4002/"

export type ReturnValue = {
  followStatus: boolean,
  followsMe: boolean,
  requestSent: boolean
}