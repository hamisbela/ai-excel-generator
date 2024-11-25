import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

interface ChartTheme {
  name: string;
  cssVars: {
    light: { primary: string };
    dark: { primary: string };
  };
}

const themes: ChartTheme[] = [
  {
    name: "light",
    cssVars: {
      light: { primary: "24.6 95% 53.1%" },
      dark: { primary: "20.5 90.2% 48.2%" },
    },
  },
  {
    name: "dark",
    cssVars: {
      light: { primary: "24.6 95% 53.1%" },
      dark: { primary: "20.5 90.2% 48.2%" },
    },
  },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Value
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[0].value}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Time
            </span>
            <span className="font-bold">{label}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

interface ChartData {
  value: number;
  [key: string]: any;
}

interface ChartProps {
  data: ChartData[];
  className?: string;
}

export function Chart({ data, className }: ChartProps) {
  const { theme: mode } = useTheme();
  const theme = themes.find((t) => t.name === mode) || themes[0];

  return (
    <Card className={className}>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            strokeWidth={2}
            dataKey="value"
            activeDot={{
              r: 6,
              style: { fill: "var(--theme-primary)", opacity: 0.8 },
            }}
            style={
              {
                stroke: "var(--theme-primary)",
                "--theme-primary": `hsl(${
                  theme.cssVars[mode === "dark" ? "dark" : "light"].primary
                })`,
              } as React.CSSProperties
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}