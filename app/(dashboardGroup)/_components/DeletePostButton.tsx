"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { deletepost } from "../_actions/mypostaction";

export function DeletePostButton({ postId }: { postId: string }) {
  const action = deletepost.bind(null, postId);

  const [state, formAction, pending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Post deleted successfully");
    } else {
      toast.error(state.message || "Failed to delete post");
    }
  }, [state]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 data-icon="inline-start" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Post?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This post will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <form action={formAction}>
            <AlertDialogAction type="submit" disabled={pending}>
              {pending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
