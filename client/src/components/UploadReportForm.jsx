import { useState } from "react";
import api from "@/lib/api";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UploadReportForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState({ type: "", report_date: "" });
  const [message, setMessage] = useState("");

  const upload = async (e) => {
    e.preventDefault();

    if (!file) return setMessage("⚠️ Select a file first");
    if (!meta.type || !meta.report_date) return setMessage("⚠️ All fields are required");

    const f = new FormData();
    f.append("report", file);
    f.append("type", meta.type);
    f.append("report_date", meta.report_date);

    try {
      await api.post("/reports/upload", f);
      setMessage("✅ Report uploaded successfully!");
      setFile(null);
      setMeta({ type: "", report_date: "" });

      if (onUploaded) onUploaded(); // refresh dashboard list
    } catch (err) {
      setMessage("❌ Upload failed. Try again.");
    }
  };

  return (
    <form onSubmit={upload} className="space-y-4">
      {message && (
        <p
          className={`text-center text-sm ${
            message.startsWith("⚠️") ? "text-yellow-600" :
            message.startsWith("❌") ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      <div>
        <Label>Select Report File</Label>
        <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <div>
        <Label>Report Type</Label>
        <Input
          value={meta.type}
          placeholder="Blood Test, X-Ray, Sugar Lab..."
          onChange={(e) => setMeta({ ...meta, type: e.target.value })}
        />
      </div>

      <div>
        <Label>Date of Test</Label>
        <Input type="date" value={meta.report_date} onChange={(e) => setMeta({ ...meta, report_date: e.target.value })} />
      </div>

      <Button type="submit" className="w-full">Upload Report</Button>
    </form>
  );
}
