import { LoginForm } from "../../features/auth/components/form/LoginForm";

export default function LoginPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <LoginForm />
    </section>
  );
}