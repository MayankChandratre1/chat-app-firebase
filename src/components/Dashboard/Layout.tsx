import { Sidebar } from "@/components/Dashboard/Sidenav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  )
}
