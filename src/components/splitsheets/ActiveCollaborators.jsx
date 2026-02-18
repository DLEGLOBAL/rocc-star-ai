import React from "react";
import { Users, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ActiveCollaborators({ activeUsers = [] }) {
  if (!activeUsers.length) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900">
      <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      <div className="flex -space-x-2">
        {activeUsers.slice(0, 3).map((user, idx) => (
          <div
            key={user.user_email}
            className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xs font-semibold border-2 border-white dark:border-slate-900 relative"
            title={user.user_name}
          >
            {user.user_name?.[0]?.toUpperCase() || "?"}
            <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400 absolute -bottom-0.5 -right-0.5" />
          </div>
        ))}
      </div>
      <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
        {activeUsers.length} {activeUsers.length === 1 ? "person" : "people"} viewing
      </span>
    </div>
  );
}