import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import RegisterForm from "@/components/forms/register-form";

const RegisterPage = () => {
  return (
    <Card className="w-[350px] mb-4">
      <CardHeader>
        <CardTitle>Get Started</CardTitle>
        <CardDescription>
          Take your property management to the next level
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
