import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF", "#FF6F91"];

function StudentCoursePieChart(props) {
    const { analytics } = props;
    // If courseCounts is undefined, set data as empty array
    const data = analytics && analytics.courseCounts
        ? analytics.courseCounts.map(item => ({
            name: item.course || "Unknown",
            value: parseInt(item.count)
        }))
        : [];

    const GenderData = analytics && analytics.genderCounts
        ? analytics.genderCounts.map(item => ({
            name: item.gender || "Unknown",
            value: parseInt(item.count)
        }))
        : [];

    console.log(data, "course data");

    // If data is empty, show loading or no data message
    if (!data.length) {
        return <div className="text-center py-10">Loading or No Data Available</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-4 pt-5">
            <div style={{ width: "100%", height: 350}}>
                <h2 className="text-lg text-center font-semibold mb-4">Students Course Details</h2>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div style={{ width: "100%", height: 350 }}>
                <h2 className="text-lg font-semibold mb-4 text-center">Students Gender Details</h2>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={GenderData}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {GenderData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default StudentCoursePieChart;
