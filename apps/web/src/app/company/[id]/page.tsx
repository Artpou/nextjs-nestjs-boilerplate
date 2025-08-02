"use client";

import { useQuery } from "@tanstack/react-query";
import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";

import { useAPI } from "@/hooks/useAPI";

const CompanyPage = () => {
  const t = useTranslations();
  const params = useParams();
  const api = useAPI();
  const companyId = String(params.id);

  const {
    data: company,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["company", companyId],
    queryFn: async () => {
      const { data, error } = await api.GET("/companies/{id}", {
        params: { path: { id: companyId } },
      });

      if (error) throw new Error("Failed to fetch company");

      return data;
    },
    enabled: !!companyId,
  });

  useQuery({
    queryKey: ["company2", companyId],
    queryFn: async () => {
      await api.GET("/companies/{id}", {
        params: { path: { id: companyId } },
      });
    },
    enabled: !!companyId,
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-muted-foreground">
            Loading company information...
          </p>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-fit">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>
              Failed to load company information. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Company Details</h1>
        <p className="text-muted-foreground">
          Viewing information for company ID: {companyId}
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Building2 className="size-6 text-primary" />
            <div>
              <CardTitle className="text-2xl">{company.name}</CardTitle>
              <CardDescription>Company ID: {company.id}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {company.description && (
            <div className="mb-6">
              <h3 className="mb-2 font-semibold">Description</h3>
              <p className="leading-relaxed text-muted-foreground">
                {company.description}
              </p>
            </div>
          )}

          <Separator className="my-6" />

          <div className="grid gap-4 md:grid-cols-2">
            {company.email && (
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {company.email}
                  </a>
                </div>
              </div>
            )}

            {company.phone && (
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a
                    href={`tel:${company.phone}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {company.phone}
                  </a>
                </div>
              </div>
            )}

            {company.website && (
              <div className="flex items-center gap-3">
                <Globe className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Website</p>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {company.website}
                  </a>
                </div>
              </div>
            )}

            {company.address && (
              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    {company.address}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              Created:{" "}
              {new Date(company.createdAt as string).toLocaleDateString()}
            </Badge>
            <Badge variant="outline">
              Updated:{" "}
              {new Date(company.updatedAt as string).toLocaleDateString()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
        <Button>Edit Company</Button>
      </div>
    </div>
  );
};

export default CompanyPage;
