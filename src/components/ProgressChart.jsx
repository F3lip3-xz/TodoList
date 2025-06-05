import React from 'react';

const ProgressChart = ({ total, completed }) => {
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="progress-chart text-center mb-4">
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="10"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#28a745"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 50 50)"
                />
                <text x="50" y="50" textAnchor="middle" dy="0.3em" fontSize="20" fill="#333">
                    {`${Math.round(percentage)}%`}
                </text>
            </svg>
            <p className="mt-2">Progreso: {completed} de {total}</p>
        </div>
    );
};

export default ProgressChart;