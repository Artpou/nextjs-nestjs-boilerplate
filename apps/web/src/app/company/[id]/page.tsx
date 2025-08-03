'use client';

import { notFound, useParams } from 'next/navigation';

import { Building2, Globe, Mail, MapPin, Phone } from 'lucide-react';

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

const CompanyPage = () => {
  const params = useParams();
  const companyId = String(params.id);

  const {
    data: company,
    error,
    isLoading,
  } = openapiQuery.useQuery('get', '/companies/{id}', {
    params: { path: { id: companyId } },
  });

  if (error) notFound();

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Building2 className="size-6 text-primary" />
            <div>
              <CardTitle className="text-2xl">
                {!company ? <Skeleton text="Company Name" /> : company.name}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <Separator className="my-6" />
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <ContactInfo
              icon={Mail}
              label="Email"
              value={company?.email}
              href={`mailto:${company?.email}`}
              isLoading={isLoading}
            />

            <ContactInfo
              icon={Phone}
              label="Phone"
              value={company?.phone}
              href={`tel:${company?.phone}`}
              isLoading={isLoading}
            />

            <ContactInfo
              icon={Globe}
              label="Website"
              value={company?.website}
              href={company?.website}
              isLoading={isLoading}
            />

            <ContactInfo
              icon={MapPin}
              label="Address"
              value={company?.address}
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
          <Button>Edit Company</Button>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
