import { UserStatus, UserRole } from "@/utils/enums";

export interface UserState {
  _id: string | null;
  status:
    | UserStatus.INITIAL
    | UserStatus.PENDING
    | UserStatus.CONFIRMED
    | UserStatus.REJECTED;
  username: string;
  email: string;
  roles: string[];
}

const defaultState: UserState = {
  _id: null,
  status: UserStatus.INITIAL,
  username: "",
  email: "",
  roles: [UserRole.USER],
};

interface InitAction {
  type: "INIT";
}

interface SetUerAction {
  type: "SET_USER";
  payload: UserState;
}
interface SetAuthenticatedAction {
  type: "SET_IS_AUTHENTICATED";
  payload: boolean;
}

interface SetRolesAction {
  type: "SET_ROLES";
  payload: string[];
}
interface SetStatusAction {
  type: "SET_STATUS";
  payload:
    | UserStatus.INITIAL
    | UserStatus.PENDING
    | UserStatus.CONFIRMED
    | UserStatus.REJECTED;
}

interface SetUsernameAction {
  type: "SET_USERNAME";
  payload: string;
}

interface SetEmailAcion {
  type: "SET_EMAIL";
  payload: string;
}

export type AuthAction =
  | InitAction
  | SetUerAction
  | SetAuthenticatedAction
  | SetRolesAction
  | SetStatusAction
  | SetUsernameAction
  | SetEmailAcion;

const authReducer = (state: UserState | any, action: AuthAction): UserState => {
  switch (action.type) {
    case "INIT":
      console.log("auth provider init");
      return defaultState;
    case "SET_USER":
      console.log("set_user reducer", action.payload);
      console.log("state: ", state);
      const newState = { ...state, ...action.payload };
      console.log("NEW STATE: ", newState);
      return { ...state, ...action.payload };
    // case "SET_IS_AUTHENTICATED":
    //   return { ...state, isAuthenticated: action.payload };
    case "SET_ROLES":
      return { ...state, roles: [...state.roles, ...action.payload] };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default authReducer;
