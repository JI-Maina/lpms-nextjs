import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/auth/login-form";

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

      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="hover:underline text-ring">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
