import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UploadReportForm from "@/components/UploadReportForm";
import AddVitalsForm from "@/components/AddVitalsForm";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [openVitalsModal, setOpenVitalsModal] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [rRes, vRes] = await Promise.all([api.get("/reports"), api.get("/vitals")]);
      setReports(rRes.data.reverse());
      setVitals(vRes.data.reverse());
    } catch (err) {
      console.error("LOAD DASHBOARD ERROR:", err);
    }
  };

  const latestVitals = vitals[0] || {};

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

      {/* ---------------- HEADER ---------------- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Digital Health Wallet
        </h1>
        <Button
          variant="destructive"
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
        >
          Logout
        </Button>
      </div>

      {/* ---------------- ACTION BUTTONS ---------------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        {/* Upload Report Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload Report</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>📤 Upload Medical Report</DialogTitle>
            </DialogHeader>
            <UploadReportForm onUploaded={loadDashboardData} />
          </DialogContent>
        </Dialog>

        {/* Add Vitals Modal */}
        <Dialog open={openVitalsModal} onOpenChange={setOpenVitalsModal}>
          <DialogTrigger asChild>
            <Button>Add Vitals</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>➕ Add Daily Vitals</DialogTitle>
            </DialogHeader>
            <AddVitalsForm
              onSaved={() => {
                loadDashboardData();
                setOpenVitalsModal(false); // auto-close modal
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Other Navigation */}
        <Button onClick={() => (window.location.href = "/reports")}>
          View All Reports
        </Button>
        <Button onClick={() => (window.location.href = "/vitals")}>
          Vitals Chart
        </Button>
      </div>

      {/* ---------------- SUMMARY CARDS ---------------- */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{reports.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last Upload Date</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl">
              {reports.length ? reports[0].report_date : "No reports yet"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Vitals</CardTitle>
          </CardHeader>
          <CardContent>
            {vitals.length ? (
              <div className="space-y-1">
                <p>BP: {latestVitals.bp}</p>
                <p>Sugar: {latestVitals.sugar}</p>
                <p>Heart Rate: {latestVitals.heart_rate}</p>
                <p className="text-xs opacity-70">{latestVitals.date}</p>
              </div>
            ) : (
              <p>No vitals recorded</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ---------------- RECENT REPORTS TABLE ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {!reports.length && <p>No reports uploaded.</p>}

          {reports.length > 0 && (
            <table className="w-full text-left border dark:border-gray-700">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-sm">
                  <th className="p-2">Type</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Download</th>
                </tr>
              </thead>
              <tbody>
                {reports.slice(0, 5).map((r) => (
                  <tr key={r.id} className="border-b dark:border-gray-700">
                    <td className="p-2">{r.type}</td>
                    <td className="p-2">{r.report_date}</td>
                    <td className="p-2">
                      <a
                        href={`http://localhost:5000/uploads/${r.filename}`}
                        className="text-blue-500 underline"
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
