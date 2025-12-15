"use client";

import dynamic from "next/dynamic";

// Client-only canvas with suspense fallback disabled (null) to avoid server hydration.
const Stars = dynamic(() => import("./StarBackground"), {
  ssr: false,
  loading: () => null,
});

const StarBackgroundClient = () => {
  return <Stars />;
};

export default StarBackgroundClient;

