'use client';

import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const CompanyError = ({ error, reset }: ErrorProps) => {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <Card className="w-fit max-w-md">
        <CardHeader>
          <CardTitle className="text-destructive">
            Something went wrong!
          </CardTitle>
          <CardDescription>
            There was an error loading the company information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            {error.message || 'An unexpected error occurred'}
          </p>
          <div className="flex gap-2">
            <Button onClick={reset} variant="outline">
              Try again
            </Button>
            <Button onClick={() => window.history.back()}>Go back</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyError;
