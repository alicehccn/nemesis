import * as React from "react";
import { RadarChart } from "@mui/x-charts/RadarChart";

export default function Chart() {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <RadarChart
      suppressHydrationWarning
      height={450}
      width={400}
      margin={40}
      series={[
        {
          label: "Backend",
          data: [120, 98, 86, 99, 85, 65],
          // valueFormatter,
        },
        {
          label: "Frontend",
          data: [120, 40, 40, 100, 90, 20],
          // valueFormatter,
        },

        {
          label: "DevOps",
          data: [60, 60, 40, 20, 20, 20],
          // valueFormatter,
        },
      ]}
      radar={{
        metrics: [
          "Typescript\nNodeJS\nPython",
          "React\nHTML\nCSS\nWebpack",
          "HTTP\ngRPC\nMQ",
          "Auth\nOAuth",
          "SQL\nNoSQL",
          "Git\nAWS\nVercel\nDocker\nHeroku",
        ],
      }}
    />
  );
}
