import LoginForm from "@/components/molecules/LoginPhone/LoginForm"
import { UserNavigation } from "@/components/molecules"
import { retrieveCustomer } from "@/lib/data/customer"

export default async function UserPage() {
  const user = await retrieveCustomer()

  if (!user) return <LoginForm />

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-kiddo-accent to-kiddo-dark px-4 pt-6 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
            <span className="text-2xl font-bold text-white">
              {user.first_name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-xs text-white/90 mt-0.5">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="px-4 -mt-4">
        <UserNavigation />
      </div>
    </main>
  )
}
