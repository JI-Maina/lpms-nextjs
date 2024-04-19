import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "@/components/auth/register-form";

const RegisterPage = () => {
  return (
    <Card className="w-[380px] mb-4">
      <CardHeader>
        <CardTitle>Get Started</CardTitle>
        <CardDescription>
          Take your property management to the next level
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RegisterForm />
      </CardContent>

      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="hover:underline text-ring">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
