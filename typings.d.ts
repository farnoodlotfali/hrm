export interface User {
  address: string;
  avatar: string;
  birth: string;
  createdAt: string;
  email: string;
  fname: string;
  id: number;
  lname: string;
  mobile: number;
  nationalcode: string;
  password: string;
  role: string;
  trello_username: string;
  updatedAt: string;
}
export interface AppContextInterface {
  collapse: boolean;
  setCollapse: (value: boolean) => void;
  sideBarItemKey: string;
  setSideBarItemKey: (value: string) => void;
  user: User | null;
  setUser: (value: User | null) => void;
  userLogout: () => void;
  taskId: number;
  setTaskId: (value: number) => void;
}

export interface CardTrello {
  id: string;
  desciption: string;
  name: string;
  shortUrl: string;
  board: string;
}
export interface UserProject {
  id: number;
  project: number;
  user: number;
  contract: number;
  role: string;
  project_title: string;
}

export type Year = {
  id: number;
  name: string;
};
