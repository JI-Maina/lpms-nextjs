import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Card className="w-[350px] mb-4">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Resume the journey</CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
