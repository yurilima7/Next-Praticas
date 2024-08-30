import React, { useState, useEffect } from 'react';

interface CalendarProps {
  month: number;
  year: number;
  locale?: string; // Para personalizar os nomes dos dias da semana
}

const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [currentMonth, setCurrentMonth] = useState<number>(selectedDate.getMonth());
    const [currentYear, setCurrentYear] = useState<number>(selectedDate.getFullYear());

    const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  
    const daysInMonth = (month: number, year: number) =>
      new Date(year, month + 1, 0).getDate();
  
    const getDayOfWeek = (day: number, month: number, year: number) =>
      new Date(year, month, day).getDay();
  
    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const days = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);
    const firstDayIndex = getDayOfWeek(1, currentMonth, currentYear);
  
    const handlePrevMonth = () => {
        const newMonth = currentMonth - 1;
        const newYear = newMonth < 0 ? currentYear - 1 : currentYear;
        const validMonth = newMonth < 0 ? 11 : newMonth;
        
        setCurrentMonth(validMonth);
        setCurrentYear(newYear);
    };
  
    const handleNextMonth = () => {
        const newMonth = currentMonth + 1;
        const newYear = newMonth > 11 ? currentYear + 1 : currentYear;
        const validMonth = newMonth > 11 ? 0 : newMonth;
        
        setCurrentMonth(validMonth);
        setCurrentYear(newYear);
    };

    // Função para capitalizar a primeira letra e deixar o restante em minúsculas
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    
    console.log(selectedDate);
  
    return (
      <div className="max-w-xs mx-auto p-4 bg-white rounded-xl shadow-md">
        <div className="flex justify-between items-center">
          <button
            className="text-white bg-[#3D64D9] h-[30px] w-[30px] rounded-[10px]"
            onClick={handlePrevMonth}
          >
            &lt;
          </button>

          <h2 className="text-lg font-semibold">
          {capitalizeFirstLetter(new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" }))} de {currentYear}
          </h2>

          <button
            className="text-white bg-[#3D64D9] h-[30px] w-[30px] rounded-[10px]"
            onClick={handleNextMonth}
          >
            &gt;
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mt-4 text-center">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-[#515B79]">
              {day}
            </div>
          ))}

          {Array(firstDayIndex)
            .fill(null)
            .map((_, index) => (
              <div key={index} />
            ))}

          {days.map((day) => {
            const dayDate = new Date(currentYear, currentMonth, day);
            const isBeforeToday = dayDate < todayDateOnly;
            const isSelected = selectedDate &&
                        day === selectedDate.getDate() &&
                        currentMonth === selectedDate.getMonth() &&
                        currentYear === selectedDate.getFullYear();
            const dayOfWeek = getDayOfWeek(day, currentMonth, currentYear);
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
            return (
                <div
                    key={day}
                    className={`p-[5px] rounded-[10px] cursor-pointer ${
                    isBeforeToday
                        ? "text-[#B7B7B7] cursor-not-allowed"
                        : !isSelected && day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                        ? "bg-[#B9CFFF] text-black cursor-pointer font-medium"
                        : isSelected
                        ? "bg-[#3D64D9] text-white"
                        : "cursor-pointer"
                    }  ${
                        isWeekend && !isBeforeToday ? "text-red-600 cursor-not-allowed" : ""
                    }`}
                    onClick={() => !isBeforeToday && !isWeekend && setSelectedDate(dayDate)}
                >
                {day}
                </div>
            )
        })}
        </div>
      </div>
    );
};

export default Calendar;