import { useEffect, useRef } from "react";

function RevealText({
  children,
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-text ${className}`}
      style={{
        "--reveal-delay": `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default RevealText;