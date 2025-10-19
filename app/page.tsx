export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-theme-primary">Simple Tactics</h1>
      <p className="mt-4 text-lg">
        Welcome to Simple Tactics - Your interactive tactics board for youth
        soccer coaching.
      </p>
      <div className="mt-8 rounded-lg border border-theme-primary p-6">
        <h2 className="text-xl font-semibold">Project Initialized</h2>
        <p className="mt-2">
          The app is ready for development. Next steps: implement the tactics
          grid and field rendering.
        </p>
      </div>
    </main>
  )
}
