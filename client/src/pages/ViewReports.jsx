import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ViewReports() {
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({ type: "", date: "", search: "" });

  useEffect(() => {
    api.get("/reports").then((res) => setReports(res.data.reverse()));
  }, []);

  const filtered = reports.filter((r) => {
    return (
      (filters.type ? r.type.toLowerCase().includes(filters.type.toLowerCase()) : true) &&
      (filters.date ? r.report_date === filters.date : true) &&
      (filters.search ? r.filename.toLowerCase().includes(filters.search.toLowerCase()) : true)
    );
  });

  return (
    <div className="min-h-screen bg-background p-6">

      {/* 🔙 Back Button */}
      <div className="mb-6 flex justify-between items-center">
        <Button
          variant="outline"
          className="rounded-md"
          onClick={() => (window.location.href = "/")}
        >
          ⬅ Back
        </Button>

        <h1 className="text-2xl font-semibold text-foreground">📁 Your Health Reports</h1>

        {/* align-space filler for symmetry */}
        <div className="w-[100px]" />
      </div>

      {/* 🔍 Filter Section */}
      <Card className="mb-6 shadow-md shadow-primary/10">
        <CardHeader>
          <CardTitle className="text-foreground">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Report Type</Label>
              <Input
                placeholder="Blood, MRI..."
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              />
            </div>

            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
            </div>

            <div>
              <Label>Search File</Label>
              <Input
                placeholder="report.pdf"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>

          <Button
            className="mt-4"
            variant="outline"
            onClick={() => setFilters({ type: "", date: "", search: "" })}
          >
            Reset Filters
          </Button>
        </CardContent>
      </Card>

      {/* 📑 Reports Table */}
      <Card className="shadow-md shadow-primary/10">
        <CardHeader>
          <CardTitle className="text-foreground">All Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {!filtered.length && (
            <p className="text-muted-foreground text-center py-4">
              No reports found.
            </p>
          )}

          {filtered.length > 0 && (
            <table className="w-full border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted text-muted-foreground text-sm">
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Filename</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border">
                    <td className="p-2">{r.type}</td>
                    <td className="p-2">{r.report_date}</td>
                    <td className="p-2">{r.filename}</td>
                    <td className="p-2">
                      <a
                        href={`http://localhost:5000/uploads/${r.filename}`}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View / Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
