import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "../components/Input";
import Card from "../components/Card";
import { Container } from "../components/Container";
import Button from "../components/Button";
import { useFirebaseUser } from "../hooks/useFirebaseUser";
import { useNavigate } from "react-router-dom";
type Inputs = {
  fullname: string;
  email: string;
  password: string;
  cellphone: number;
  birthDate: string;
};
export default function RegisterPage() {
  const { registerWithFirebase } = useFirebaseUser();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    registerWithFirebase(
      data.email,
      data.password,
      data.fullname,
      data.cellphone,
      data.birthDate
    );
    navigate("/home")
  };
  return (
    <>
      <Container>
        <Card className="my-3" title="Register">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Fullname"
              type="text"
              aria-invalid={errors.fullname ? "true" : "false"}
              {...register("fullname", { required: true })}
            />
            {errors.fullname && <span>This field is required</span>}
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

            <Input
              label="Cellphone"
              type="number"
              {...register("cellphone", { required: true })}
            />
            {errors.password && <span>This field is required</span>}

            <Input
              label="BirthDate"
              type="date"
              {...register("birthDate", { required: true })}
            />
            {errors.password && <span>This field is required</span>}

            <div className="flex justify-between w-full">
              <Button variant="primary" type="submit">
                Register
              </Button>
              
              <Button variant="primary" type="button" onClick={() => navigate('/login')}>
                I have an account
              </Button>
            </div>
            
          </form>

        </Card>
      </Container>
    </>
  );
};
