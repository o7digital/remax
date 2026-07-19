import { PageHeader } from "@/components/page-header";
import { SubscriptionManager } from "@/components/subscription-manager";

export default function SettingsSubscriptionsPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Souscriptions"
        description="Creation de liens client, gestion des abonnements, admins et mise en paiement."
      />

      <SubscriptionManager />
    </div>
  );
}
