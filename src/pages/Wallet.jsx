import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Wallet() {
  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => base44.entities.Transaction.list("-created_date", 100),
    initialData: []
  });

  const completedTransactions = transactions.filter(t => t.status === "completed");
  const totalIncome = completedTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  
  const totalPayouts = completedTransactions
    .filter(t => t.type === "payout")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const balance = totalIncome - totalPayouts;

  const pendingTransactions = transactions.filter(t => t.status === "pending");

  const typeIcons = {
    income: { Icon: ArrowDownRight, color: "text-emerald-500", bg: "bg-emerald-50" },
    payout: { Icon: ArrowUpRight, color: "text-blue-500", bg: "bg-blue-50" },
    escrow_hold: { Icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
    escrow_release: { Icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    fee: { Icon: DollarSign, color: "text-slate-500", bg: "bg-slate-50" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Wallet & Payouts</h1>
          <p className="text-slate-500">Track your revenue and manage payouts</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-500 font-medium">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">${balance.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-1">Ready for payout</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-500 font-medium">Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-600">${totalIncome.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <p className="text-xs text-emerald-500">All-time earnings</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-500 font-medium">Total Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">${totalPayouts.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-1">Withdrawn</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400">No transactions yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.map((transaction) => {
                  const config = typeIcons[transaction.type] || typeIcons.income;
                  const Icon = config.Icon;

                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", config.bg)}>
                          <Icon className={cn("w-5 h-5", config.color)} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {transaction.description || transaction.type.replace(/_/g, " ")}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {transaction.source && (
                              <span className="text-xs text-slate-500">{transaction.source}</span>
                            )}
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              transaction.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                              transaction.status === "pending" ? "bg-amber-100 text-amber-700" :
                              "bg-slate-100 text-slate-600"
                            )}>
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={cn(
                          "font-bold",
                          transaction.type === "income" ? "text-emerald-600" : "text-slate-900"
                        )}>
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount?.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-400">
                          {format(new Date(transaction.created_date), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}