"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";

let initialized = false;

export function AmplitudeInit() {
  useEffect(() => {
    if (initialized) return;

    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    if (!apiKey) {
      console.warn("NEXT_PUBLIC_AMPLITUDE_API_KEY is not set; skipping Amplitude init.");
      return;
    }

    amplitude.init(apiKey, {
      autocapture: {
        elementInteractions: true,
        pageViews: true,
        formInteractions: true,
      },
    });
    initialized = true;
  }, []);

  return null;
}
