interface MeshProps {
  variant?: "hero" | "soft";
  className?: string;
}

// TODO: migrar a Framer Motion (motion.div con animate de transform en loop)
export default function Mesh({ variant = "hero", className = "" }: MeshProps) {
  if (variant === "hero") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
        <div
          className="blob b-anim-1"
          style={{ width: 720, height: 720, left: "-12%", top: "-22%", background: "radial-gradient(circle, #2B5BFF 0%, rgba(43,91,255,0) 60%)" }}
        />
        <div
          className="blob b-anim-2"
          style={{ width: 600, height: 600, right: "-10%", top: "8%", background: "radial-gradient(circle, #4F7BFF 0%, rgba(79,123,255,0) 60%)", opacity: 0.45 }}
        />
        <div
          className="blob b-anim-3"
          style={{ width: 520, height: 520, left: "30%", bottom: "-25%", background: "radial-gradient(circle, #0A1A4F 0%, rgba(10,26,79,0) 60%)", opacity: 0.85, mixBlendMode: "normal" }}
        />
      </div>
    );
  }
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <div
        className="blob b-anim-2"
        style={{ width: 520, height: 520, left: "-8%", top: "20%", background: "radial-gradient(circle, #2B5BFF 0%, rgba(43,91,255,0) 65%)", opacity: 0.35 }}
      />
      <div
        className="blob b-anim-1"
        style={{ width: 480, height: 480, right: "-6%", bottom: "10%", background: "radial-gradient(circle, #4F7BFF 0%, rgba(79,123,255,0) 65%)", opacity: 0.28 }}
      />
    </div>
  );
}
