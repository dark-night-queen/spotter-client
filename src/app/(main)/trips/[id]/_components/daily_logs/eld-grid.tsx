"use client";

import React from "react";

const STATUS_Y_MAP = {
  OFF_DUTY: 20,
  SLEEPER_BERTH: 60,
  DRIVING: 100,
  ON_DUTY: 140,
};

const MARGIN_LEFT = 100;
const GRID_WIDTH = 600;
const HEIGHT = 180;
const TOTAL_WIDTH = GRID_WIDTH + MARGIN_LEFT + 20;

interface ELDGridProps {
  statusChanges: {
    start_time: string;
    end_time: string;
    status: "OFF_DUTY" | "SLEEPER_BERTH" | "DRIVING" | "ON_DUTY";
  }[];
}

export const ELDGrid = ({ statusChanges }: ELDGridProps) => {
  const formatHourLabel = (hour: number): string => {
    if (hour === 0) return "12am";
    if (hour === 12) return "12pm";
    if (hour === 24) return "12am";
    return `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? "pm" : "am"}`;
  };

  const getX = (timestamp: string) => {
    const time = new Date(timestamp);
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();

    const isNextDay =
      time.getUTCSeconds() === 0 &&
      hours === 0 &&
      minutes === 0 &&
      time.getUTCDate() !== new Date(statusChanges[0].start_time).getUTCDate();

    const totalMinutes = isNextDay ? 1440 : hours * 60 + minutes;
    return MARGIN_LEFT + (totalMinutes / 1440) * GRID_WIDTH;
  };

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-white rounded-xl border p-4 shadow-sm overflow-hidden">
        <svg
          viewBox={`0 0 ${TOTAL_WIDTH} ${HEIGHT}`}
          className="w-full h-auto font-sans"
        >
          {/* 1. Background Lanes */}
          {Object.entries(STATUS_Y_MAP).map(([label, y]) => (
            <g key={label}>
              <line
                x1={MARGIN_LEFT}
                y1={y}
                x2={MARGIN_LEFT + GRID_WIDTH}
                y2={y}
                stroke="#90a1b9"
                strokeDasharray="4"
              />
              <text
                x={MARGIN_LEFT - 15}
                y={y + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 font-bold uppercase tracking-tight"
              >
                {label.replace("_", " ")}
              </text>
            </g>
          ))}

          {/* 2. Vertical Hour Markers & X-Axis Labels */}
          {[...Array(25)].map((_, i) => (
            <g key={i}>
              <line
                x1={MARGIN_LEFT + (i / 24) * GRID_WIDTH}
                y1={10}
                x2={MARGIN_LEFT + (i / 24) * GRID_WIDTH}
                y2={150}
                stroke={i % 6 === 0 ? "#e2e8f0" : "#f8fafc"}
                strokeWidth={i % 6 === 0 ? 1 : 0.5}
              />
              {i % 4 === 0 && (
                <text
                  x={MARGIN_LEFT + (i / 24) * GRID_WIDTH}
                  y={170}
                  textAnchor="middle"
                  className="text-[10px] fill-slate-400 font-mono"
                >
                  {formatHourLabel(i)}
                </text>
              )}
            </g>
          ))}

          {/* 3. The Path Logic */}
          <g
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {statusChanges.map((log, index) => {
              const xStart = getX(log.start_time);
              const xEnd = getX(log.end_time);
              const y = STATUS_Y_MAP[log.status];
              const nextLog = statusChanges[index + 1];

              return (
                <React.Fragment key={index}>
                  {/* Horizontal Segment */}
                  <line x1={xStart} y1={y} x2={xEnd} y2={y} />

                  {/* Vertical Transition */}
                  {nextLog && (
                    <line
                      x1={xEnd}
                      y1={y}
                      x2={xEnd}
                      y2={
                        STATUS_Y_MAP[
                          nextLog.status as keyof typeof STATUS_Y_MAP
                        ]
                      }
                      className="stroke-emerald-500"
                      strokeWidth="2.5"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};
