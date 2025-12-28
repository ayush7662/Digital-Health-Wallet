import { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddVitalsForm({ onSaved }) {
  const [form, setForm] = useState({ date: "", bp: "", sugar: "", heart_rate: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const saveVitals = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/vitals", form);
      setMsg("Vitals saved ✔");
      setForm({ date: "", bp: "", sugar: "", heart_rate: "" });
      if (onSaved) onSaved(); // Notify dashboard to refresh data
    } catch (err) {
      setMsg("❌ Failed to save vitals");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={saveVitals} className="space-y-4">
      {msg && (
        <p
          className={`text-center text-sm ${
            msg.startsWith("❌") ? "text-red-500" : "text-green-600"
          }`}
        >
          {msg}
        </p>
      )}

      <div>
        <Label>Date</Label>
        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
      </div>

      <div>
        <Label>BP (Blood Pressure)</Label>
        <Input
          placeholder="120/80"
          value={form.bp}
          onChange={(e) => setForm({ ...form, bp: e.target.value })}
          required
        />
      </div>

      <div>
        <Label>Sugar Level</Label>
        <Input
          placeholder="90"
          value={form.sugar}
          onChange={(e) => setForm({ ...form, sugar: e.target.value })}
          required
        />
      </div>

      <div>
        <Label>Heart Rate</Label>
        <Input
          placeholder="75"
          value={form.heart_rate}
          onChange={(e) => setForm({ ...form, heart_rate: e.target.value })}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
