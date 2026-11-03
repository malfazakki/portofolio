import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "M Al Fatih Muzakki | Fullstack Web Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0d1117",
          padding: "60px 80px",
          border: "8px solid #22c55e",
          boxShadow: "inset 0 0 40px rgba(34, 197, 94, 0.2)",
          fontFamily: "monospace",
        }}
      >
        {/* Left Side: Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "700px",
          }}
        >
          {/* Top Tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#22c55e",
              }}
            />
            <span
              style={{
                color: "#22c55e",
                fontSize: "20px",
                fontWeight: "bold",
                letterSpacing: "3px",
              }}
            >
              [ SOFTWARE ENGINEER ]
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              color: "#ffffff",
              fontSize: "48px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1px",
              margin: 0,
              marginBottom: "16px",
            }}
          >
            M AL FATIH MUZAKKI
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: 1.4,
              margin: 0,
              marginBottom: "32px",
            }}
          >
            Fullstack Developer specializing in Next.js, Go (Echo), NestJS, React & PostgreSQL.
          </p>

          {/* Tech Badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {[
              "Next.js 15",
              "Go (Golang)",
              "NestJS",
              "TypeScript",
              "PostgreSQL",
              "Redis",
            ].map((tech) => (
              <span
                key={tech}
                style={{
                  border: "2px solid #22c55e",
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  color: "#22c55e",
                  padding: "6px 14px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Pixel Avatar Box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "280px",
            height: "280px",
            border: "6px solid #22c55e",
            backgroundColor: "#161b22",
            boxShadow: "10px 10px 0px 0px #22c55e",
          }}
        >
          {/* Pixel Head Icon */}
          <svg
            width="220"
            height="220"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hair */}
            <rect x="16" y="8" width="32" height="4" fill="#222222" />
            <rect x="12" y="12" width="40" height="4" fill="#222222" />
            <rect x="12" y="16" width="40" height="4" fill="#222222" />
            <rect x="12" y="20" width="8" height="4" fill="#222222" />
            <rect x="44" y="20" width="8" height="4" fill="#222222" />
            <rect x="12" y="24" width="4" height="4" fill="#222222" />
            <rect x="48" y="24" width="4" height="4" fill="#222222" />

            {/* Face */}
            <rect x="20" y="20" width="24" height="4" fill="#FFD7B0" />
            <rect x="16" y="24" width="32" height="12" fill="#FFD7B0" />
            <rect x="20" y="36" width="24" height="4" fill="#FFD7B0" />

            {/* Eyes */}
            <rect x="20" y="24" width="8" height="4" fill="#FFFFFF" />
            <rect x="36" y="24" width="8" height="4" fill="#FFFFFF" />
            <rect x="24" y="24" width="4" height="4" fill="#222222" />
            <rect x="40" y="24" width="4" height="4" fill="#222222" />

            {/* Glasses */}
            <rect x="18" y="22" width="12" height="2" fill="#444444" />
            <rect x="34" y="22" width="12" height="2" fill="#444444" />
            <rect x="30" y="22" width="4" height="2" fill="#444444" />

            {/* Mouth */}
            <rect x="24" y="32" width="16" height="2" fill="#444444" />

            {/* Shirt */}
            <rect x="20" y="40" width="24" height="8" fill="#50fa7b" />
            <rect x="16" y="44" width="4" height="8" fill="#50fa7b" />
            <rect x="44" y="44" width="4" height="8" fill="#50fa7b" />
            <rect x="20" y="48" width="24" height="8" fill="#50fa7b" />

            {/* Headphones */}
            <rect x="8" y="16" width="4" height="8" fill="#bd93f9" />
            <rect x="52" y="16" width="4" height="8" fill="#bd93f9" />
            <rect x="12" y="12" width="4" height="4" fill="#bd93f9" />
            <rect x="48" y="12" width="4" height="4" fill="#bd93f9" />
            <rect x="12" y="24" width="4" height="4" fill="#bd93f9" />
            <rect x="48" y="24" width="4" height="4" fill="#bd93f9" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
