import { FileText, Eye, PenLine, Plus, TrendingUp } from "lucide-react";

const DashboardPage = () => {
  const stats = [
    {
      title: "Total Posts",
      value: "24",
      description: "All your posts",
      icon: FileText,
    },
    {
      title: "Published",
      value: "18",
      description: "Live posts",
      icon: TrendingUp,
    },
    {
      title: "Drafts",
      value: "6",
      description: "Posts in draft",
      icon: PenLine,
    },
    {
      title: "Total Views",
      value: "12,450",
      description: "Views on your posts",
      icon: Eye,
    },
  ];

  const recentPosts = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence",
      status: "Published",
      views: 2450,
      date: "Aug 19, 2026",
    },
    {
      id: 2,
      title: "How Next.js Server Components Work",
      status: "Published",
      views: 1820,
      date: "Aug 18, 2026",
    },
    {
      id: 3,
      title: "Getting Started with TypeScript",
      status: "Draft",
      views: 0,
      date: "Aug 17, 2026",
    },
    {
      id: 4,
      title: "Modern Web Development in 2026",
      status: "Published",
      views: 3210,
      date: "Aug 15, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <p className="mt-1 text-muted-foreground">
              Welcome back! Here&apos;s an overview of your posts.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            <Plus className="size-4" />
            Create Post
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>

                  <div className="rounded-lg bg-muted p-2">
                    <Icon className="size-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-2xl font-bold">{stat.value}</h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Posts */}
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b px-6 py-5">
            <div>
              <h2 className="font-semibold">Recent Posts</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your latest posts
              </p>
            </div>

            <button className="text-sm font-medium text-primary hover:underline">
              View All
            </button>
          </div>

          <div className="divide-y">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-3 px-6 py-5 transition hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="truncate font-medium">{post.title}</h3>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.date}</span>

                    <span className="flex items-center gap-1">
                      <Eye className="size-3.5" />
                      {post.views.toLocaleString()} views
                    </span>
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
                    post.status === "Published"
                      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                  }`}
                >
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button className="flex items-center gap-4 rounded-xl border bg-card p-5 text-left transition hover:bg-muted/50">
              <div className="rounded-lg bg-primary/10 p-3">
                <Plus className="size-5 text-primary" />
              </div>

              <div>
                <h3 className="font-medium">Create Post</h3>
                <p className="text-sm text-muted-foreground">
                  Write a new post
                </p>
              </div>
            </button>

            <button className="flex items-center gap-4 rounded-xl border bg-card p-5 text-left transition hover:bg-muted/50">
              <div className="rounded-lg bg-primary/10 p-3">
                <FileText className="size-5 text-primary" />
              </div>

              <div>
                <h3 className="font-medium">My Posts</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your posts
                </p>
              </div>
            </button>

            <button className="flex items-center gap-4 rounded-xl border bg-card p-5 text-left transition hover:bg-muted/50">
              <div className="rounded-lg bg-primary/10 p-3">
                <Eye className="size-5 text-primary" />
              </div>

              <div>
                <h3 className="font-medium">Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Check your performance
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
