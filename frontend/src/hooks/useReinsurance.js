import { useEffect, useState } from "react";
import * as service from "../services/reinsuranceService";

export default function useReinsurance() {
  const [treaties, setTreaties] = useState([]);
  const [allocations, setAllocations] = useState([]);

  const load = async () => {
    try {
      const t = await service.getTreaties();
      const a = await service.getAllocations();
      setTreaties(t);
      setAllocations(a);
    } catch {
      alert("Error loading reinsurance data");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { treaties, allocations, load };
}
