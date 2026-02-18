import { useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

let lastNotifiedTransaction = null;

export default function PaymentNotification() {
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions", user?.email],
    queryFn: () => base44.entities.Transaction.filter({ created_by: user.email }, "-created_date", 10),
    enabled: !!user?.email,
    refetchInterval: 60000, // Check every minute
  });

  useEffect(() => {
    const checkForNewPayments = async () => {
      if (transactions.length === 0) return;
      
      const latestTransaction = transactions[0];
      
      // Only notify for completed income transactions
      if (
        latestTransaction.type === "income" && 
        latestTransaction.status === "completed" &&
        latestTransaction.id !== lastNotifiedTransaction
      ) {
        lastNotifiedTransaction = latestTransaction.id;
        
        try {
          const user = await base44.auth.me();
          
          // Send email notification if enabled
          if (user.notification_preferences?.email_payment_confirmations !== false) {
            await base44.integrations.Core.SendEmail({
              to: user.email,
              subject: `💰 Payment Received: $${latestTransaction.amount?.toLocaleString()}`,
              body: `You've received a payment!

Amount: $${latestTransaction.amount?.toLocaleString()}
Source: ${latestTransaction.source || "Unknown"}
Description: ${latestTransaction.description || "Payment received"}

Your new balance has been updated in your Rocc$tar AI wallet.

Log in to view details and transaction history.`
            });
          }
        } catch (error) {
          console.error("Failed to send payment notification");
        }
      }
    };

    checkForNewPayments();
  }, [transactions]);

  return null;
}