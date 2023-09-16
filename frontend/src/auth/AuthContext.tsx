import React , useState

const AuthState = React.createContext({
  userName: "",
  isLoggedIn: false,
  authToken: null,
});

const AuthStateProvider = (props) => {
  let token = null;  
  if(localStorage.getItem("token")) return token = localStorage.getItem("token");

  const [ user, setUser ] = useState({
    userName: "Anonymous",
    isLoggedIn: false,
    authToken: token,
  });
  
  const autoLogin = useCallback( async () => {
    try {
      const response = await axios({
        method:'post',
        url: 'http://127.0.0.1:3001/authEn'
        headers: {
          "Content-Type": "application/json",
          "Authentication": user.authToken
        }
      });

      if(response.status === 200){
        //code to update context using setUser state handler
      } else {
        throw new Error("request failed");
      }
    } catch (e) {
      console.log(e.message);
    }
  });

  useEffect( async () => {
    await autoLogin();
  }, [autoLogin]);
  
  return (
    <AuthState.Provider
      value={{
        userName: user.userName,
        isLoggedIn: user.isLoggedIn,
        authToken: user.authToken
      }}    
    >
      {props.children}
    </AuthState.Provider>
  );
}