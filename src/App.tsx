import React, { useState } from 'react';
import './app.css'; 
const AttendanceCalculator: React.FC = () => {
  const [totalHoursConducted, setTotalHoursConducted] = useState<number | undefined>(undefined);
  const [hoursMissed, setHoursMissed] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<string | null>(null);

  const requiredAttendance = 75.0;

  const calculateHoursToMeetRequirement = (total: number, missed: number): string => {
    const hoursAttended = total - missed;
    const currentAttendance = (hoursAttended / total) * 100;

    if (currentAttendance >= requiredAttendance) {
      let additionalHoursMissed = 0;

      while ((hoursAttended) / (total + additionalHoursMissed) * 100 >= requiredAttendance) {
        additionalHoursMissed++;
      }

      return `You can miss ${additionalHoursMissed - 1} more hours to keep your attendance above ${requiredAttendance}%.`;
    } else {
      
      let additionalHoursRequired = 0;

      while (((hoursAttended + additionalHoursRequired) / total) * 100 < requiredAttendance) {
        additionalHoursRequired++;
      }

      return `You need to attend ${additionalHoursRequired} more hours to achieve ${requiredAttendance}% attendance.`;
    }
  };

  const handleCalculate = () => {
    if (totalHoursConducted !== undefined && hoursMissed !== undefined) {
      const resultMessage = calculateHoursToMeetRequirement(totalHoursConducted, hoursMissed);
      setResult(resultMessage);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="container">
      <h1>Attendance Calculator</h1>
      <div>
        <label>
          Total Hours Conducted:
          <input
            type="number"
            value={totalHoursConducted ?? ''}
            onChange={(e) => setTotalHoursConducted(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Hours Missed:
          <input
            type="number"
            value={hoursMissed ?? ''}
            onChange={(e) => setHoursMissed(Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && (
        <div>
          <h2>{result}</h2>
        </div>
      )}
      <footer>
        <p>Made by <a href="https://www.linkedin.com/in/pratyush-pradhan" target="_blank" rel="noopener noreferrer">Pratyush</a></p>
      </footer>
    </div>
  );
};

export default AttendanceCalculator;