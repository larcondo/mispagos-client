import { useState, createContext, useMemo } from 'react'

const UserContext = createContext();

const UserProvider = (props) => {
  const [userinfo, setUserinfo] = useState({})
  const userObject = useMemo(() => ({userinfo, setUserinfo}),[userinfo])

  // const values = {
  //   // value: value,
  //   userObject: value2
  // }

  return (
    <UserContext.Provider value={userObject}>
      { props.children }
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider }