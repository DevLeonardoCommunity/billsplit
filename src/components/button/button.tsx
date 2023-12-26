import type { QRL } from "@builder.io/qwik";
import { $, Slot, component$ } from "@builder.io/qwik";

export default component$(
  ({
    onClick$ = $(() => {}),
    size = "regular",
    customClass = "",
    variant = "primary",
  }: {
    onClick$?: QRL<() => void>;
    size?: "regular" | "big";
    customClass?: string;
    variant?: "primary" | "secondary" | "danger";
  }) => {
    const colors: Record<typeof variant, string> = {
      primary: "bg-blue-500 hover:bg-blue-700",
      secondary: "bg-green-500 hover:bg-green-700",
      danger: "bg-red-500 hover:bg-red-700",
    };
    return (
      <button
        class={`bg-blue-500 hover:bg-blue-700 text-white font-bold ${
          size === "regular" ? "py-2 px-4" : "py-4 px-8"
        } rounded w-auto ${colors[variant]} ${customClass}`}
        onClick$={onClick$}
      >
        <Slot />
      </button>
    );
  }
);
