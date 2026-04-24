"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

// Meta (Facebook) Pixel. ID is a public tracking identifier, safe to ship.
export const META_PIXEL_ID = "327540131662961";

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

/** Fire a custom or standard Meta Pixel event. Safe to call before fbq loads. */
export function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    if (params) window.fbq("track", event, params);
    else window.fbq("track", event);
  }
}

/**
 * Injects the Meta Pixel base code and fires PageView on every client-side
 * route change. `usePathname`/`useSearchParams` require a Suspense boundary,
 * so the inner tracker component is wrapped below.
 */
export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}

/** Fires a PageView on every in-app navigation (after the initial load). */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstRun = useRef(true);

  useEffect(() => {
    // The base script already fires PageView once on initial load, so skip
    // the first invocation of this effect to avoid duplicate events.
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (typeof window === "undefined" || typeof window.fbq !== "function") {
      return;
    }
    window.fbq("track", "PageView");
  }, [pathname, searchParams]);

  return null;
}

/** <noscript> fallback pixel. Rendered separately in <body>. */
export function MetaPixelNoscript() {
  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
