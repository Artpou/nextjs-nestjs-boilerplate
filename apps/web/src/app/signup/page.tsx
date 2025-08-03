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

import useAPI from '@/hooks/useAPI';

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type RegisterBody = z.infer<typeof RegisterSchema>;

const SignupPage = () => {
  const router = useRouter();
  const { POST } = useAPI();
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterBody>({
    resolver: zodResolver(RegisterSchema),
  });

  const { mutate: signup, isPending } = useMutation({
    mutationFn: async (data: RegisterBody) => {
      const { error } = await POST('/auth/register', {
        body: data,
      });

      if (error) throw error;

      const signInResult = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      if (signInResult?.error) throw signInResult.error;
    },
    onSuccess: () => {
      router.push('/');
      router.refresh();
    },
    onError: (error) => {
      setError('root', { message: error.message });
    },
  });

  const onSubmit = (data: RegisterBody): void => {
    signup(data);
  };

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
            label={t('auth.email')}
            error={errors.email?.message}
          >
            <Input type="email" {...register('email')} />
          </InputWrapper>
          <InputWrapper
            className="w-full"
            label={t('auth.password')}
            error={errors.password?.message}
          >
            <Input type="password" {...register('password')} />
          </InputWrapper>
          <div className="flex items-center justify-center gap-4">
            <Button variant="secondary" asChild>
              <Link href="/">{t('common.cancel')}</Link>
            </Button>
            <Button type="submit" isLoading={isPending}>
              {t('common.signup')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
