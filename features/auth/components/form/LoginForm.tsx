"use client";

import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Toast } from "../../../../components/ui/toast";
import { useLogin } from "../hooks/hooks";
import { loginSchema } from "../schema/schema";

export function LoginForm() {
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setValidationError(parsed.error.issues[0]?.message ?? "Input tidak valid");
      return;
    }
    setValidationError(null);
    try {
      await login(parsed.data);
    } catch {
      // error.message sudah tampil via toast/form
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Toast message={validationError ?? error} />
      <Input
        type="email"
        placeholder="email@contoh.co"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Masuk…" : "Masuk"}
      </Button>
    </form>
  );
}