import { QwikAuth$ } from "@auth/qwik";
import Google from "@auth/qwik/providers/google";
import { eq } from "drizzle-orm";
import { db } from "~/db";
import { users } from "~/db/schema";
export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [Google],
    callbacks: {
      signIn: async ({ user, account }) => {
        if (!account?.providerAccountId) return false;

        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.externalId, account.providerAccountId));

        if (existingUser.length === 0) {
          await db.insert(users).values({
            // TODO: Fix this TS error
            //@ts-ignore
            externalId: account.providerAccountId,
            name: user.name,
            email: user.email,
          });
        }

        return true;
      },
    },
  }),
);
