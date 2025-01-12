'use client'

import React, { useEffect, useState, CSSProperties } from 'react';
import { differenceInDays, parseISO } from 'date-fns';

const StreakPage: React.FC = () => {
    const [streakData, setStreakData] = useState<{streak : number; date : string}[]>(() => {
        const storedData = localStorage.getItem('streakData');
        return storedData ? JSON.parse(storedData) : [];
    });
    const [date, setDate] = useState<Date>(() => {
        const storedDate = localStorage.getItem('date');
        return storedDate ? new Date(storedDate) : new Date();
    });

    const handleBack =() => {
        window.location.href = '/';
    }

    useEffect (() => {
        localStorage.setItem('streakData', JSON.stringify(streakData));
    }, [streakData]);
    
    function buy() {
        const today = new Date();
        const lastEntry = streakData[streakData.length - 1];
        const previousDate = lastEntry ? new Date(lastEntry.date) : null;
        const difference = previousDate ? differenceInDays(today, previousDate) : Infinity;

        if (difference === 1) {
            const newStreak = lastEntry.streak >= 7 ? 1 : lastEntry.streak + 1;
            setStreakData([...streakData, { streak: newStreak, date: today.toISOString()}]);
        } else if (difference > 1) {
            setStreakData([...streakData, { streak: 1, date: today.toISOString()}]);
        } else if (difference === 0) {
            if (!lastEntry || lastEntry.streak === 0) {
                setStreakData([...streakData, { streak: 1, date: today.toISOString()}]);
            }
        }
        
    }

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Streak Tracker</h1>
            <div style={styles.card}>
                <p style={styles.text}>
                    <strong>Current Streak:</strong> {streakData.length ? streakData[streakData.length - 1].streak : 0} day
                </p>
                <p style={styles.text}>
    <strong>Last Login:</strong>{' '}
    {streakData.length
        ? new Date(streakData[streakData.length - 1].date).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : 'No data'}
</p>
                <button
                    style={{
                        ...styles.button,
                        backgroundColor: isHovered ? '#45a049' : '#4caf50',
                    }}
                    onMouseEnter={() => setIsHovered(true)} 
                    onMouseLeave={() => setIsHovered(false)} 
                    onClick={buy}
                >
                    Make Purchase!
                </button>
                <button
                    style={{
                        ...styles.button,
                        backgroundColor: '#f44336', 
                    }}
                    onClick={handleBack}
                >
                    Back
                </button>    
            </div>
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        padding: '20px',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#4caf50',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
    },
    text: {
        fontSize: '1.2rem',
        margin: '10px 0',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#4caf50',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default StreakPage;