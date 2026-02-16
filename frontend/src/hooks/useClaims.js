import { useEffect, useState } from "react";
import * as claimsService from "../services/claimsService";

export default function useClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);

  const reload = async () => {
    try {
      setLoading(true);
      const data = await claimsService.getClaims();
      setClaims(data);
    } catch {
      alert("Error loading claims");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  return { claims, loading, reload };
}
