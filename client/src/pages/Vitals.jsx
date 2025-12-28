import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Vitals() {
  const [vitals, setVitals] = useState([]);
  const [view, setView] = useState("bp");

  useEffect(() => {
    api.get("/vitals").then((res) => {
      const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setVitals(sorted);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">

      {/* Back Button */}
      <div className="mb-6 flex">
        <Button
          variant="outline"
          className="rounded-md"
          onClick={() => (window.location.href = "/")}
        >
          ⬅ Back
        </Button>
      </div>

      <Card className="shadow-md shadow-primary/10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            📊 Vitals Trend
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Toggle Buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              size="sm"
              className={view === "bp" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
              onClick={() => setView("bp")}
            >
              Blood Pressure (BP)
            </Button>
            <Button
              size="sm"
              className={view === "sugar" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
              onClick={() => setView("sugar")}
            >
              Sugar Level
            </Button>
            <Button
              size="sm"
              className={view === "heart_rate" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
              onClick={() => setView("heart_rate")}
            >
              Heart Rate
            </Button>
          </div>

          {/* Chart */}
          {vitals.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={vitals}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" />
                <XAxis dataKey="date" tick={{ fill: "var(--foreground)" }} />
                <YAxis tick={{ fill: "var(--foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--card)", color: "var(--foreground)" }} />
                <Legend />
                <Line type="monotone" dataKey={view} stroke="var(--primary)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground mt-4">
              No vitals recorded yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
