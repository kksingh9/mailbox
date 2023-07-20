import { Form, Button, Container, Card } from "react-bootstrap";
import React, { useState, useRef } from "react";
//import { useDispatch } from "react-redux";
//import { authActions } from "../../store/auth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  //const isLoggedIn = useSelector(state => state.auth.isAuthenticated)
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useHistory();
  //const dispatch = useDispatch();

  const enterEmailInputRef = useRef();
  const enterPasswordInputRef = useRef();
  const enterConfirmPasswordRef = useRef();

  const SwitchHandler = () => {
    setIsLogin((prevent) => !prevent);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = enterEmailInputRef.current.value;
    const enteredPassword = enterPasswordInputRef.current.value;
    //const enteredConfirmPassword = enterConfirmPasswordRef.current.value;
    //dispatch(authActions.login());
    setIsLoading(true);
    //let url;
    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYe7rxDYbi7WgXlIL3QX92DmYYVyXFWho",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            // passwordE: enteredConfirmPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";
              //   if (data && data.error && data.error.message){
              //         errorMessage = data.error.message;
              //   }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          //console.log(data);
          //dispatch(authActions.login(data.idToken));
          //navigate.push("/navigation/home");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYe7rxDYbi7WgXlIL3QX92DmYYVyXFWho",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            // passwordE: enteredConfirmPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            // return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";
              //   if (data && data.error && data.error.message){
              //         errorMessage = data.error.message;
              //   }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          //console.log(data);
          //dispatch(authActions.login(data.idToken));
          //navigate.push("/navigation/home");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <>
      <Container style={{margin: 'auto',maxWidth: "30rem", width:"90%"}} className="mt-3">
        <Card style={{backgroundColor: "#f5f5f5"}}>
        <h1 style={{color:"gray"}}>{isLogin ? "Login" : "Sign Up"}</h1>
        <Form onSubmit={onSubmitHandler} style={{margin:"2rem"}}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={enterEmailInputRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={enterPasswordInputRef} />
          </Form.Group>
          {!isLogin && (
            <Form.Group className="mb-3" controlId="EPassword">
              <Form.Label>Comfirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref={enterConfirmPasswordRef} />
            </Form.Group>
          )}
          {!isLoading && (
            <Button variant="primary" type="submit">
              {isLogin ? "Login" : "Create Account"}
            </Button>
          )}
          <br></br>
          {isLoading && <p>Sending request...</p>}
          <Button variant="primary" type="button" className="mt-3" onClick={SwitchHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </Button>
        </Form>
        </Card>
      </Container>
    </>
  );
};

export default AuthForm;
