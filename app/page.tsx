"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const creat = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    })
  );

  const testAI = useMutation(trpc.testAI.mutationOptions());

  return (
    <div>
      {data?.map((workflow) => (
        <div key={workflow.id}>{workflow.name}</div>
      ))}
      <Button disabled={testAI.isPending} onClick={() => testAI.mutate()}>
        {" "}
        Test AI
      </Button>
      <Button onClick={() => creat.mutate()}> Create workflows</Button>
    </div>
  );
};

export default Page;
