'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertTitle } from '@workspace/ui/components/alert';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Input, InputWrapper } from '@workspace/ui/components/input';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type LoginBody = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const t = useTranslations();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginBody>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: async (data: LoginBody) => {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) throw new Error();
    },
    onSuccess: () => {
      router.push('/');
      router.refresh();
    },
    onError: () => {
      setError('root', { message: 'Invalid email or password' });
    },
  });

  const onSubmit = async (data: LoginBody) => login(data);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Card className="flex w-fit min-w-96 flex-col items-center justify-center gap-4 p-6">
        <form
          className="flex w-full max-w-md flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {!!errors.root && (
            <Alert variant="destructive">
              <AlertTitle>{errors.root.message}</AlertTitle>
            </Alert>
          )}

          <InputWrapper
            className="w-full"
            label="Email"
            error={errors.email?.message}
          >
            <Input type="email" {...register('email')} />
          </InputWrapper>

          <InputWrapper
            className="w-full"
            label="Password"
            error={errors.password?.message}
          >
            <Input type="password" {...register('password')} />
          </InputWrapper>

          <div className="flex items-center justify-center gap-4">
            <Button variant="secondary" asChild>
              <Link href="/">{t('common.cancel')}</Link>
            </Button>

            <Button type="submit" isLoading={isPending}>
              {t('common.signIn')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
