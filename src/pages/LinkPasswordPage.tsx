import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "../components/Input";
import Card from "../components/Card";
import { Container } from "../components/Container";
import Button from "../components/Button";
import { useFirebaseUser } from "../hooks/useFirebaseUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
type Inputs = {
  email: string;
  password: string;
};

export default function LinkPasswordPage() {
  const { user, linkWithPassword } = useFirebaseUser();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (!user) {
      return;
    }
    setValue("email", user.email || "");
  }, [user, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    linkWithPassword(data.email, data.password);
    navigate("/home")
  };

  return (
    <>
      <Menu />
      <Container>
        <Card className="my-3" title="Link with username and password">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              type="email"
              readOnly={!!user}
              disabled={!!user}
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
            <div>
              <Button variant="primary" type="submit">
                Link with user
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </>
  );
};
