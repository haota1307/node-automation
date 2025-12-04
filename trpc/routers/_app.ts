import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";

export const appRouter = createTRPCRouter({
  testAI: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
      data: {
        prompt: "Write a short story about a robot learning to love.",
      },
    });

    return { success: true, story: "Job queued." };
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "haodev1307@gmail.com",
      },
    });
    return { success: true, message: "Workflow creation triggered." };
  }),
});

export type AppRouter = typeof appRouter;
