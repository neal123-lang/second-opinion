"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authService } from "@/lib/services/auth-service";
import { getApiErrorMessage, getRoleRedirectPath } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth/use-auth-store";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await authService.loginUser({
        email: data.email,
        password: data.password,
      });

      login(response.access_token, response.user);
      toast.success("Login successful!");
      const redirectPath = getRoleRedirectPath(response.user);
      router.push(redirectPath);
    } catch (error: unknown) {
      toast.error("Failed to login", {
        description: getApiErrorMessage(error, "Invalid email or password"),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email" className="text-xs font-medium text-muted-foreground">
                Email Address
              </FieldLabel>
              <Input
                {...field}
                id="login-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="h-[56px] rounded-lg border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-2 focus-visible:border-primary focus-visible:ring-0"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-password" className="text-xs font-medium text-muted-foreground">
                Password
              </FieldLabel>
              <Input
                {...field}
                id="login-password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="h-[56px] rounded-lg border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-2 focus-visible:border-primary focus-visible:ring-0"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        className="h-[48px] w-full rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
