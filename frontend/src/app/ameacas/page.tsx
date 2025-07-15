'use client';

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Tipo dos dados de ameaça recebidos da API
type Threat = {
  id: string;
  name: string;
  descripiton: string;
};

export default function ThreatsPage() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://amazone-sznk.onrender.com/threat")
      .then((res) => res.json())
      .then((data) => {
        setThreats(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      
      <main style={{ background: "#fff", minHeight: "100vh" }}>
        <section
          style={{
            background: "url('/fire.jpg') no-repeat center center",
            backgroundSize: "cover",
            height: "250px",
            borderRadius: "0 0 16px 16px",
          }}
        />
        <section
          style={{
            padding: "2rem 4rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              color: "#6D5E5E",
              fontWeight: 600,
              fontSize: "2rem",
              marginBottom: "2rem",
              fontStyle: "italic",
              letterSpacing: "1px",
            }}
          >
            O QUE COLOCA AMAZÔNIA EM RISCO
          </h2>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            threats.map((threat) => (
              <div
                key={threat.id}
                style={{
                  marginBottom: "2.5rem",
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  padding: "1.5rem 1rem 1rem 1rem",
                  border: "1px solid #eee",
                }}
              >
                <h3
                  style={{
                    color: "#22A66B",
                    fontWeight: 600,
                    fontStyle: "italic",
                    fontSize: "1.2rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {threat.name}
                </h3>
                <p
                  style={{
                    fontStyle: "italic",
                    color: "#222",
                    marginBottom: "1rem",
                    fontSize: "1rem",
                  }}
                >
                  {threat.descripiton}
                </p>
                <hr style={{ margin: "0" }} />
              </div>
            ))
          )}
        </section>
      </main>
     
    </>
  );
}