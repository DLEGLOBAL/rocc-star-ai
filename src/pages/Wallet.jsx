import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  ArrowLeft, Wallet as WalletIcon, TrendingUp, TrendingDown,
  ArrowUpRight, ArrowDownLeft, Clock, CheckCircle,
  CreditCard, Building, DollarSign, Loader2, RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentNotification from "../components/wallet/PaymentNotification";

const transactionIcons = {
  income: ArrowDownLeft,
  payout: ArrowUpRight,
  escrow_hold: Clock,
  escrow_release: CheckCircle,
  fee: CreditCard,
};

const transactionColors = {
  income: "text-emerald-500 bg-emerald-50",
  payout: "text-violet-500 bg-violet-50",
  escrow_hold: "text-amber-500 bg-amber-50",
  escrow_release: "text-blue-500 bg-blue-50",
  fee: "text-slate-500 bg-slate-50",
};

export default function Wallet() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => base44.entities.Transaction.list("-created_date", 50),
  });

  const completedTransactions = transactions.filter(t => t.status === "completed");
  const pendingTransactions = transactions.filter(t => t.status === "pending");

  const totalBalance = completedTransactions.reduce((sum, t) => {
    if (t.type === "income" || t.type === "escrow_release") return sum + (t.amount || 0);
    if (t.type === "payout" || t.type === "fee") return sum - (t.amount || 0);
    return sum;
  }, 0);

  const totalIncome = completedTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalPayouts = completedTransactions
    .filter(t => t.type === "payout")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const pendingAmount = pendingTransactions
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["transactions"] });
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <PaymentNotification />
      <div className="max-w-lg mx-auto px-4 pt-safe py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link 
              to={createPageUrl("Dashboard")}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Wallet</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Manage your earnings</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={cn(
              "p-2.5 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 transition-colors select-none",
              isRefreshing && "animate-spin"
            )}
          >
            <RefreshCw className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <WalletIcon className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400 text-sm font-medium">Available Balance</span>
            </div>
            <p className="text-4xl font-bold text-white mb-6">
              ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1 text-emerald-400 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs">Income</span>
                </div>
                <p className="text-white font-semibold">
                  ${totalIncome.toLocaleString()}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-violet-400 mb-1">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-xs">Payouts</span>
                </div>
                <p className="text-white font-semibold">
                  ${totalPayouts.toLocaleString()}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">Pending</span>
                </div>
                <p className="text-white font-semibold">
                  ${pendingAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 transition-colors text-left select-none">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-3">
              <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="font-semibold text-slate-900 dark:text-white">Withdraw</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">To bank account</p>
          </button>
          <button className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 transition-colors text-left select-none">
            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <p className="font-semibold text-slate-900 dark:text-white">Add Funds</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Deposit money</p>
          </button>
        </div>

        {/* Transactions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
          <Tabs defaultValue="all" className="w-full">
            <div className="border-b border-slate-100 dark:border-slate-700 px-4">
              <TabsList className="bg-transparent h-12 p-0 gap-4">
                <TabsTrigger 
                  value="all" 
                  className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-0"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="income"
                  className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-0"
                >
                  Income
                </TabsTrigger>
                <TabsTrigger 
                  value="payouts"
                  className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-0"
                >
                  Payouts
                </TabsTrigger>
              </TabsList>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-16">
                <WalletIcon className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400">No transactions yet</p>
              </div>
            ) : (
              <>
                <TabsContent value="all" className="m-0">
                  <TransactionList transactions={transactions} />
                </TabsContent>
                <TabsContent value="income" className="m-0">
                  <TransactionList transactions={transactions.filter(t => t.type === "income")} />
                </TabsContent>
                <TabsContent value="payouts" className="m-0">
                  <TransactionList transactions={transactions.filter(t => t.type === "payout")} />
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function TransactionList({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No transactions</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-50">
      {transactions.map((tx) => {
        const Icon = transactionIcons[tx.type] || DollarSign;
        const isCredit = tx.type === "income" || tx.type === "escrow_release";
        
        return (
          <div key={tx.id} className="flex items-center gap-3 p-4">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              transactionColors[tx.type]
            )}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 truncate">
                {tx.description || tx.type?.replace(/_/g, " ")}
              </p>
              <p className="text-xs text-slate-400">
                {tx.source || format(new Date(tx.created_date), "MMM d, yyyy")}
              </p>
            </div>
            <div className="text-right">
              <p className={cn(
                "font-semibold",
                isCredit ? "text-emerald-600" : "text-slate-900"
              )}>
                {isCredit ? "+" : "-"}${tx.amount?.toLocaleString()}
              </p>
              <p className={cn(
                "text-xs",
                tx.status === "completed" ? "text-emerald-500" :
                tx.status === "pending" ? "text-amber-500" : "text-slate-400"
              )}>
                {tx.status}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}