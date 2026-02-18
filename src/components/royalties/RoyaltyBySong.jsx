import React from "react";
import { format } from "date-fns";
import { Music, Users } from "lucide-react";

export default function RoyaltyBySong({ reports }) {
  // Group by song
  const songGroups = reports.reduce((acc, report) => {
    if (!acc[report.song_title]) {
      acc[report.song_title] = [];
    }
    acc[report.song_title].push(report);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(songGroups).map(([songTitle, songReports]) => {
        const totalForSong = songReports.reduce((sum, r) => sum + r.calculated_amount, 0);

        return (
          <div key={songTitle} className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                <Music className="w-5 h-5 text-violet-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{songTitle}</p>
                <p className="text-sm text-slate-500">
                  {songReports.length} collaborator{songReports.length > 1 ? "s" : ""}
                </p>
              </div>
              <p className="font-bold text-slate-900">${totalForSong.toFixed(2)}</p>
            </div>

            <div className="space-y-2 pl-13">
              {songReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between py-2 border-t border-slate-50">
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {report.collaborator_name || report.collaborator_email}
                    </p>
                    <p className="text-xs text-slate-400">{report.split_percentage}% split</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    ${report.calculated_amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}