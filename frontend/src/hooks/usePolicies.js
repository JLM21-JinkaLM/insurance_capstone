import { useState, useEffect } from "react";
import * as policyService from "../services/policyService";

export default function usePolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPolicies = async () => {
    try {
      setLoading(true);
      const data = await policyService.getPolicies();
      setPolicies(data);
    } catch (err) {
      alert("Error loading policies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  return { policies, loading, loadPolicies };
}
