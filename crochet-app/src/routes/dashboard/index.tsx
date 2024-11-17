import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Form } from "@builder.io/qwik-city";
import { useSignOut, useSession } from "../../routes/plugin@auth";

export default component$(() => {
  const signOutSig = useSignOut();
  const session = useSession();

  return (
    <div class="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <main class="mx-auto max-w-4xl px-4 text-center">
        <h1 class="mb-6 text-5xl font-bold text-gray-900">
          Welcome{" "}
          <span class="text-blue-600">
            {session.value?.user?.name || "Sem User"}
          </span>
        </h1>

        <p class="mb-12 text-xl text-gray-600">
          Your secure and seamless platform for getting things done
        </p>

        <Form action={signOutSig} preventdefault:submit>
          <input type="hidden" name="redirectTo" value="/" />
          <button>Sign Out</button>
        </Form>

        <div class="mt-12 text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <a href="/terms" class="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" class="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </div>
      </main>

      <footer class="mt-auto py-6 text-center text-gray-500">
        <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to MyApp",
  meta: [
    {
      name: "description",
      content: "Sign in to access your secure MyApp dashboard",
    },
  ],
};
