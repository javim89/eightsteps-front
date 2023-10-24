import {
  createContext, useEffect, useReducer, useCallback,
} from "react";
import jwt_decode from "jwt-decode";

interface AuthContextType extends AuthI {
  saveUser: (token: string) => void;
  logOut: () => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthI {
  user: User | null,
  token: string | null
}

enum ActionsAuthEnum {
  SAVE_USER = "SAVE_USER",
  LOGOUT_USER = "LOGOUT_USER",
}

interface ActionsAuthI {
  type: ActionsAuthEnum;
  payload?: any;
}

const initialState: AuthI = {
  user: null,
  token: localStorage.getItem("auth-token") || null,
};

const authReducer = (state: AuthI, action: ActionsAuthI) => {
  switch (action.type) {
    case ActionsAuthEnum.SAVE_USER: return {
      ...state,
      user: action.payload,
    };
    case ActionsAuthEnum.LOGOUT_USER: return initialState;
    default: return state;
  }
};

export function AuthProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const saveUser = useCallback(
    (token: string) => {
      if (!state.token) {
        localStorage.setItem("auth-token", token);
      }
      const user = jwt_decode(token);
      dispatch({
        type: ActionsAuthEnum.SAVE_USER,
        payload: user,
      });
    },
    [state.token],
  );

  const logOut = () => {
    localStorage.removeItem("auth-token");

    dispatch({
      type: ActionsAuthEnum.LOGOUT_USER,
    });
  };

  useEffect(() => {
    if (state.token) {
      saveUser(state.token);
    }
  }, [state.token, saveUser]);

  return (
    <AuthContext.Provider value={{ ...state, saveUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
