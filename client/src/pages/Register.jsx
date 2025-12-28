import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setError("❌ Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        email: form.email,
        password: form.password,
      });

      // Auto login after register
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      login(res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.error || "Server error");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                placeholder="example@gmail.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={form.password}
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={form.confirm}
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Register"}
            </Button>

            <Button
              variant="outline"
              type="button"
              onClick={() => (window.location.href = "/login")}
              className="w-full"
            >
              Already have an account? Login
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
