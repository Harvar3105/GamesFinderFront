import { isServerError, readErrorMessage } from "@/components/helpers/fetchErrors";
import { Alert } from "@/components/ui";
import type { FetchError } from "@/lib/client/fetch/bffFetch";

interface RequestErrorAlertProps {
  error: FetchError;
  failureTitle: string;
  serverErrorText: string;
}

export default function RequestErrorAlert({
  error,
  failureTitle,
  serverErrorText,
}: RequestErrorAlertProps) {
  if (isServerError(error)) {
    return (
      <Alert title="Server unavailable" code={error.status}>
        {serverErrorText}
      </Alert>
    );
  }

  return (
    <Alert title={failureTitle} code={error.status}>
      {readErrorMessage(error)}
    </Alert>
  );
}
