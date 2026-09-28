"use client";

import { Button } from "@/components/ui/button";
import { Check, Ban, Trash, Loader2 } from "lucide-react";
import { deleteDbAction } from "@/actions/databases";
import { startTransition, useActionState, useState } from "react";

type Props = {
  name: string;
};

export default function DeleteButton(props: Props) {
  const [waitingForConfirm, setWaitingForConfirm] = useState(false);

  const actionWithName = deleteDbAction.bind(null, props.name);
  const [state, action, pending] = useActionState(actionWithName, null);

  return (
    <div className="flex flex-col items-end gap-2">
      {waitingForConfirm ? (
        <div className="inline-flex gap-2">
          <Button
            variant="destructive"
            onClick={() => startTransition(() => action())}
            disabled={pending}
            aria-label="Confirm deletion"
          >
            {pending ? <Loader2 className="animate-spin" /> : <Check />}
          </Button>
          <Button
            onClick={() => setWaitingForConfirm(false)}
            disabled={pending}
            aria-label="Cancel"
          >
            <Ban />
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setWaitingForConfirm(true)}
          aria-label="Delete database"
        >
          <Trash />
        </Button>
      )}
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
    </div>
  );
}
