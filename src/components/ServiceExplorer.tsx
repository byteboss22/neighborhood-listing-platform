"use client";

import { useEffect, useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import { publicServicesSchema, type PublicService } from "@/schemas/service";

export default function ServiceExplorer() {
  const [services, setServices] = useState<PublicService[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/services", { signal: controller.signal });
        if (!response.ok) throw new Error("Services unavailable");
        const data = publicServicesSchema.parse(await response.json());
        setServices(data);
        setState("ready");
      } catch {
        if (!controller.signal.aborted) setState("error");
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  if (state === "loading") return <p role="status" className="mt-6">Loading local services…</p>;
  if (state === "error") return <p role="alert" className="mt-6">Local services are temporarily unavailable. Please try again later.</p>;
  if (services.length === 0) return <p role="status" className="mt-6">No approved services are available yet.</p>;
  return <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {services.map((service) => <ServiceCard key={service.id} service={service} />)}
  </div>;
}
