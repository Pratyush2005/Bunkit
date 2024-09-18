import { useState } from 'react';
import './app.css';

const AttendanceCalculator: React.FC = () => {
  const [totalHoursConducted, setTotalHoursConducted] = useState<number | undefined>(undefined);
  const [hoursMissed, setHoursMissed] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requiredAttendance = 75.0;

  const validateInputs = (total: number, missed: number): boolean => {
    if (total <= 0 || missed < 0) {
      setError('Total hours conducted must be greater than 0, and hours missed cannot be negative.');
      return false;
    }

    if (missed > total) {
      setError('Hours missed cannot exceed total hours conducted.');
      return false;
    }

    if (!Number.isFinite(total) || !Number.isFinite(missed)) {
      setError('Please enter valid numbers.');
      return false;
    }

    if (total > 100000 || missed > 100000) {
      setError('Values are too large, please enter reasonable numbers.');
      return false;
    }

    setError(null); // No errors
    return true;
  };

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
      if (validateInputs(totalHoursConducted, hoursMissed)) {
        const resultMessage = calculateHoursToMeetRequirement(totalHoursConducted, hoursMissed);
        setResult(resultMessage);
        setError(null);
      } else {
        setResult(null);
      }
    } else {
      setError('Please enter both total hours conducted and hours missed.');
      setResult(null);
    }
  };

  
  const isValidInput = (value: number | undefined): boolean => {
    return value !== undefined && value >= 0;
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
            onChange={(e) => setTotalHoursConducted(e.target.value === '' ? undefined : Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Hours Missed:
          <input
            type="number"
            value={hoursMissed ?? ''}
            onChange={(e) => setHoursMissed(e.target.value === '' ? undefined : Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleCalculate} disabled={!isValidInput(totalHoursConducted) || !isValidInput(hoursMissed)}>Calculate</button>
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error: {error}</h2>
        </div>
      )}
      {result !== null && !error && (
        <div>
          <h2>{result}</h2>
        </div>
      )}
      <footer>
        <p>Made by <a href="https://www.linkedin.com/in/pratyuhyuh/" target="_blank" rel="noopener noreferrer">Pratyush</a></p>
      </footer>
    </div>
  );
};

export default AttendanceCalculator;