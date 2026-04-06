import { useState, type FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { useUpdateUser } from "@/hooks/useUsers";
import { AxiosError } from "axios";
import type { ApiError } from "@/types";

export default function ProfilePage() {
  const { user } = useAuth();
  const updateMutation = useUpdateUser();

  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (!user) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    try {
      await updateMutation.mutateAsync({
        id: user.id,
        data: { username, email },
      });
      setSuccess("Profile updated successfully. Re-login to see changes reflected in the navbar.");
    } catch (err) {
      const msg =
        err instanceof AxiosError
          ? (err.response?.data as ApiError)?.detail ?? "Update failed"
          : "Update failed";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your personal information
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700">
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-900">{user.username}</p>
              <p className="text-sm text-gray-500">
                Member since {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <hr className="border-gray-200" />

          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="flex justify-end">
            <Button type="submit" isLoading={updateMutation.isPending}>
              Save changes
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
