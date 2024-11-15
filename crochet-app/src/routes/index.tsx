import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1 class="text-center text-2xl font-bold">Hi 👋</h1>
      <div class="bg-red-500 text-center font-bold">
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.................
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
