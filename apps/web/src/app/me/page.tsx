'use client';

import { notFound } from 'next/navigation';

import { User } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { Skeleton } from '@workspace/ui/components/skeleton';

import { ContactInfo } from '@/components/contact-info';
import { openapiQuery } from '@/lib/api';

const ProfilePage = () => {
  const {
    data: user,
    error,
    isLoading,
  } = openapiQuery.useQuery('get', '/auth/me');

  if (error) notFound();

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <User className="size-6 text-primary" />
            <div>
              <CardTitle className="text-2xl">
                {!user ? <Skeleton text="User Name" /> : user.name || 'User'}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <Separator className="my-6" />
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <ContactInfo
              icon={User}
              label="Email"
              value={user?.email}
              href={`mailto:${user?.email}`}
              isLoading={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      {!isLoading && (
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
          <Button>Edit Profile</Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
