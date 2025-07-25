import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "../components/Input";
import Card from "../components/Card";
import { Container } from "../components/Container";
import Button from "../components/Button";
import { useFirebaseUser } from "../hooks/useFirebaseUser";
import { useNavigate } from "react-router-dom";
type Inputs = {
  email: string;
  password: string;
};
export default function LoginPage() {
  const { loginWithFirebase, loginWithGoogle, loginWithFacebook } = useFirebaseUser();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    loginWithFirebase(data.email, data.password);
  };
  
  const onGoogleSignInClick = (e) => {
    e.preventDefault();
    loginWithGoogle();
  };

  const onFacebookSignInClick = (e) => {
    e.preventDefault();
    loginWithFacebook();
  };
  
  return (
    <>
      <Container>
        <Card className="my-3" title="Login">
          <form onSubmit={handleSubmit(onSubmit)}>

            <Input
              label="Email"
              type="email"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
            {errors.email?.type === "value" && (
              <p role="alert">It should be a valid email</p>
            )}
            
            <Input
              label="Password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}

            <div className="flex justify-between w-full">
              <Button variant="primary" type="submit">
                Login
              </Button>

              <Button
                variant="primary"
                type="button"
                onClick={onGoogleSignInClick}
              >
                Login wigh Gmail
              </Button>

              <Button
                variant="primary"
                type="button"
                onClick={onFacebookSignInClick}
              >
                Login with Facebook
              </Button>

              <Button variant="primary" type="button" onClick={() => navigate('/')}>
                Create account
              </Button>
            </div>
            
          
          </form>
        </Card>
      </Container>
    </>
  );
};
