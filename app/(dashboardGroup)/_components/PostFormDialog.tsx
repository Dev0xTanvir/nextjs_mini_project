/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IPost } from "@/lib/types";
import { PencilIcon, PlusIcon, Trash2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createpost, deletepost, updatepost } from "../_actions/mypostaction";

type PostFormDialogProps = {
  mode: "create" | "edit";
  post?: IPost;
};

export function PostFormDialog({ mode, post }: PostFormDialogProps) {
  const [open, setOpen] = useState(false);

  // =========================
  // CREATE / UPDATE ACTION
  // =========================

  const action =
    mode === "edit" && post ? updatepost.bind(null, post.id) : createpost;

  const [state, formAction, pending] = useActionState(action, null) as any;

  // =========================
  // DELETE ACTION
  // =========================

  const deleteAction =
    mode === "edit" && post ? deletepost.bind(null, post.id) : null;

  const [deleteState, deleteFormAction, deletePending] = useActionState(
    deleteAction ?? (async () => null),
    null,
  ) as any;

  // =========================
  // CREATE / UPDATE RESULT
  // =========================

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(
        state.message ||
          (mode === "edit"
            ? "Post updated successfully"
            : "Post created successfully"),
      );

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    } else {
      toast.error(state.message || "Something went wrong");
    }
  }, [state, mode]);

  // =========================
  // DELETE RESULT
  // =========================

  useEffect(() => {
    if (!deleteState) return;

    if (deleteState.success) {
      toast.success(deleteState.message || "Post deleted successfully");

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    } else {
      toast.error(deleteState.message || "Failed to delete post");
    }
  }, [deleteState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="outline" size="sm">
            <PencilIcon data-icon="inline-start" />
            Edit
          </Button>
        ) : (
          <Button>
            <PlusIcon data-icon="inline-start" />
            Create Post
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Post" : "Create Post"}
          </DialogTitle>
        </DialogHeader>

        {/* =========================
            UPDATE / CREATE FORM
        ========================= */}

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              name="title"
              defaultValue={post?.title}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>

            <Textarea
              id="content"
              name="content"
              defaultValue={post?.content}
              required
              className="min-h-32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>

            <Input
              id="thumbnail"
              name="thumbnail"
              defaultValue={post?.thumbnail ?? ""}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>

            <Input
              id="tags"
              name="tags"
              defaultValue={post?.tags?.join(", ")}
              placeholder="tech, sports"
            />
          </div>

          <Label className="flex items-center gap-2">
            <Checkbox name="isPremium" defaultChecked={post?.isPremium} />
            Mark as premium content
          </Label>

          <DialogFooter>
            {/* DELETE BUTTON */}

            {mode === "edit" && post && (
              <Button
                type="button"
                variant="destructive"
                disabled={deletePending}
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to delete this post?",
                  );

                  if (confirmed) {
                    deleteFormAction(new FormData());
                  }
                }}
              >
                <Trash2 data-icon="inline-start" />

                {deletePending ? "Deleting..." : "Delete"}
              </Button>
            )}

            {/* SAVE BUTTON */}

            <Button type="submit" disabled={pending || deletePending}>
              {pending
                ? "Saving..."
                : mode === "edit"
                  ? "Save Changes"
                  : "Create Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
