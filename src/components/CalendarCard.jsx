import { useState, useEffect } from "react";
import dayjs from "dayjs";

const CalendarCard = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(dayjs());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Get days for current month
    const daysInMonth = Array.from({ length: currentDate.daysInMonth() }, (_, i) => i + 1);
    const startDay = currentDate.startOf('month').day(); // 0 (Sunday) to 6 (Saturday)
    const emptyDays = Array.from({ length: startDay }, (_, i) => i);

    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="w-80 bg-gray-100/90  rounded-2xl shadow-2xl border border-white/50 p-6 text-gray-800 z-50 flex flex-col gap-4">
        <div className="border-b border-gray-300/50 pb-4 flex flex-col gap-1">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{currentDate.format("HH:mm")}</h2>
             <p className="text-red-500 font-bold text-sm uppercase tracking-wide">{currentDate.format("dddd, DD MMM YYYY")}</p>
        </div>
      <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center text-sm">
        {weekDays.map(day => ( <span key={day} className="text-gray-400 text-xs font-bold uppercase">{day}</span>))}
        
        {emptyDays.map(empty => <div key={`empty-${empty}`} />)}

        {daysInMonth.map((day) => {
            const isToday = day === currentDate.date();
            return (
          <div
            key={day}
            className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors text-sm font-medium ${
                isToday ? "bg-red-500 text-white shadow-md font-bold" : "hover:bg-gray-200/50 text-gray-700"
            }`}
          >
            {day}
          </div>
        )})}
      </div>
    </div>
  );
};

export default CalendarCard;
