import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  checkAdminStatus,
  unlockAdmin,
  lockAdmin,
  listQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  listResults,
  createResult,
  updateResult,
  deleteResult,
} from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — MindGift" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
});

function AdminPage() {
  const status = useQuery({ queryKey: ["admin-status"], queryFn: () => checkAdminStatus() });

  if (status.isLoading) {
    return <div className="p-8 text-muted-foreground">Loading…</div>;
  }
  if (!status.data?.unlocked) {
    return <UnlockForm onUnlocked={() => status.refetch()} />;
  }
  return <AdminDashboard onLocked={() => status.refetch()} />;
}

function UnlockForm({ onUnlocked }: { onUnlocked: () => void }) {
  const unlock = useServerFn(unlockAdmin);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await unlock({ data: { password } });
      if (res.ok) onUnlocked();
      else setError("Incorrect password");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 rounded-lg border p-6">
        <div>
          <h1 className="text-xl font-semibold">Admin access</h1>
          <p className="text-sm text-muted-foreground">Enter the admin password to continue.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Unlocking…" : "Unlock"}
        </Button>
      </form>
    </div>
  );
}

function AdminDashboard({ onLocked }: { onLocked: () => void }) {
  const lock = useServerFn(lockAdmin);
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage questions and results.</p>
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            await lock();
            onLocked();
          }}
        >
          Lock
        </Button>
      </header>
      <QuestionsSection />
      <ResultsSection />
    </div>
  );
}

// ---------- Questions ----------

type QuestionRow = {
  id: string;
  text: string;
  category: string;
  weight: number;
  created_at: string;
};

function QuestionsSection() {
  const qc = useQueryClient();
  const questions = useQuery({ queryKey: ["admin-questions"], queryFn: () => listQuestions() });
  const create = useServerFn(createQuestion);
  const update = useServerFn(updateQuestion);
  const remove = useServerFn(deleteQuestion);

  const createMut = useMutation({
    mutationFn: (data: { text: string; category: string; weight: number }) => create({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-questions"] }),
  });
  const updateMut = useMutation({
    mutationFn: (data: { id: string; text: string; category: string; weight: number }) =>
      update({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-questions"] }),
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-questions"] }),
  });

  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState(1);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Questions</h2>

      <form
        className="grid gap-3 rounded-lg border p-4 md:grid-cols-[1fr_180px_100px_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text || !category) return;
          createMut.mutate(
            { text, category, weight: Number(weight) || 1 },
            {
              onSuccess: () => {
                setText("");
                setCategory("");
                setWeight(1);
              },
            },
          );
        }}
      >
        <div className="space-y-1">
          <Label>Text</Label>
          <Input value={text} onChange={(e) => setText(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <Label>Category</Label>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <Label>Weight</Label>
          <Input
            type="number"
            min={1}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>
        <div className="flex items-end">
          <Button type="submit" disabled={createMut.isPending}>
            Add
          </Button>
        </div>
      </form>

      {questions.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-2">
          {(questions.data as QuestionRow[] | undefined)?.map((q) => (
            <QuestionRowEditor
              key={q.id}
              row={q}
              onSave={(next) => updateMut.mutate({ id: q.id, ...next })}
              onDelete={() => deleteMut.mutate(q.id)}
            />
          ))}
          {questions.data?.length === 0 && (
            <p className="text-sm text-muted-foreground">No questions yet.</p>
          )}
        </div>
      )}
    </section>
  );
}

function QuestionRowEditor({
  row,
  onSave,
  onDelete,
}: {
  row: QuestionRow;
  onSave: (data: { text: string; category: string; weight: number }) => void;
  onDelete: () => void;
}) {
  const [text, setText] = useState(row.text);
  const [category, setCategory] = useState(row.category);
  const [weight, setWeight] = useState(row.weight);
  const dirty = text !== row.text || category !== row.category || weight !== row.weight;

  return (
    <div className="grid gap-2 rounded-lg border p-3 md:grid-cols-[1fr_180px_100px_auto_auto]">
      <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} />
      <Input value={category} onChange={(e) => setCategory(e.target.value)} />
      <Input
        type="number"
        min={1}
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />
      <Button
        variant="outline"
        disabled={!dirty}
        onClick={() => onSave({ text, category, weight: Number(weight) || 1 })}
      >
        Save
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          if (confirm("Delete this question?")) onDelete();
        }}
      >
        Delete
      </Button>
    </div>
  );
}

// ---------- Results ----------

type ResultRow = {
  id: string;
  category: string;
  recommendation: string;
  link: string | null;
  created_at: string;
};

function ResultsSection() {
  const qc = useQueryClient();
  const results = useQuery({ queryKey: ["admin-results"], queryFn: () => listResults() });
  const create = useServerFn(createResult);
  const update = useServerFn(updateResult);
  const remove = useServerFn(deleteResult);

  const createMut = useMutation({
    mutationFn: (data: { category: string; recommendation: string; link: string | null }) =>
      create({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-results"] }),
  });
  const updateMut = useMutation({
    mutationFn: (data: {
      id: string;
      category: string;
      recommendation: string;
      link: string | null;
    }) => update({ data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-results"] }),
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-results"] }),
  });

  const [category, setCategory] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [link, setLink] = useState("");

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Results</h2>

      <form
        className="grid gap-3 rounded-lg border p-4 md:grid-cols-[180px_1fr_1fr_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!category || !recommendation) return;
          createMut.mutate(
            { category, recommendation, link: link || null },
            {
              onSuccess: () => {
                setCategory("");
                setRecommendation("");
                setLink("");
              },
            },
          );
        }}
      >
        <div className="space-y-1">
          <Label>Category</Label>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <Label>Recommendation</Label>
          <Input
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <Label>Link (optional)</Label>
          <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://…" />
        </div>
        <div className="flex items-end">
          <Button type="submit" disabled={createMut.isPending}>
            Add
          </Button>
        </div>
      </form>

      {results.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-2">
          {(results.data as ResultRow[] | undefined)?.map((r) => (
            <ResultRowEditor
              key={r.id}
              row={r}
              onSave={(next) => updateMut.mutate({ id: r.id, ...next })}
              onDelete={() => deleteMut.mutate(r.id)}
            />
          ))}
          {results.data?.length === 0 && (
            <p className="text-sm text-muted-foreground">No results yet.</p>
          )}
        </div>
      )}
    </section>
  );
}

function ResultRowEditor({
  row,
  onSave,
  onDelete,
}: {
  row: ResultRow;
  onSave: (data: { category: string; recommendation: string; link: string | null }) => void;
  onDelete: () => void;
}) {
  const [category, setCategory] = useState(row.category);
  const [recommendation, setRecommendation] = useState(row.recommendation);
  const [link, setLink] = useState(row.link ?? "");
  const dirty =
    category !== row.category ||
    recommendation !== row.recommendation ||
    (link || null) !== (row.link || null);

  return (
    <div className="grid gap-2 rounded-lg border p-3 md:grid-cols-[180px_1fr_1fr_auto_auto]">
      <Input value={category} onChange={(e) => setCategory(e.target.value)} />
      <Textarea
        value={recommendation}
        onChange={(e) => setRecommendation(e.target.value)}
        rows={2}
      />
      <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://…" />
      <Button
        variant="outline"
        disabled={!dirty}
        onClick={() => onSave({ category, recommendation, link: link || null })}
      >
        Save
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          if (confirm("Delete this result?")) onDelete();
        }}
      >
        Delete
      </Button>
    </div>
  );
}
