import { format } from "date-fns";
import { Download, RotateCw, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BalanceDistributionCard } from "./_components/balance-distribution-card";
import { FinanceNotification } from "./_components/finance-notification";
import { IncomeBreakdown } from "./_components/income-breakdown";
import { OverviewKpis } from "./_components/overview-kpis";
import { QuickActions } from "./_components/quick-actions";
import { TransactionsOverviewCard } from "./_components/transactions-overview-card";
import { UpcomingTransactions } from "./_components/upcoming-transactions";
import { Wallet } from "./_components/wallet";

export default function Page() {
  const formattedDate = format(new Date(), "EEEE, do MMMM yyyy");

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-6 py-2">
      <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-bold leading-tight text-foreground">Finances & Revenue</h1>
          <p className="text-xs font-medium text-muted-foreground">{formattedDate}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RotateCw className="size-3.5 text-primary" />
            <span>Updated 5 min ago</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border text-xs font-semibold text-foreground hover:bg-muted"
          >
            <Settings2 className="mr-1.5 size-3.5" />
            Settings
          </Button>
          <Button size="sm" className="rounded-full bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90">
            <Download className="mr-1.5 size-3.5" />
            Export Statement
          </Button>
        </div>
      </div>

      <Tabs defaultValue="30-days" className="flex flex-col gap-6">
        <TabsList variant="line" className="border-b border-border bg-transparent">
          <TabsTrigger
            value="30-days"
            className="font-semibold text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="12-months"
            className="font-semibold text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground"
          >
            Accounts
          </TabsTrigger>
          <TabsTrigger
            value="custom"
            className="font-semibold text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground"
          >
            Transactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="30-days" className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="xl:col-span-6">
              <OverviewKpis />
            </div>

            <div className="flex flex-col gap-6 xl:col-span-6">
              <IncomeBreakdown />
              <FinanceNotification />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <TransactionsOverviewCard />
            </div>
            <div className="xl:col-span-5">
              <BalanceDistributionCard />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="xl:col-span-4">
              <Wallet />
            </div>
            <div className="xl:col-span-4">
              <UpcomingTransactions />
            </div>
            <div className="xl:col-span-4">
              <QuickActions />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="12-months">
          <div className="flex h-64 items-center justify-center rounded-[14px] border border-dashed border-border bg-card text-sm text-muted-foreground">
            Accounts view coming soon.
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <div className="flex h-64 items-center justify-center rounded-[14px] border border-dashed border-border bg-card text-sm text-muted-foreground">
            Transactions view coming soon.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
