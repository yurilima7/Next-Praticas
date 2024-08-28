"use client";
import { useState, useEffect } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Define a interface para o horário disponível
interface AvailableTime {
  time: string;
  available: boolean;
}

const formatDate = (date: Date | null): string => {
  return date ? date.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';
};

export default function Agendamento() {
  // Define o estado para a data selecionada e os horários disponíveis
  const [date, setDate] = useState<Date | null>(new Date());
  const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>([]);

  useEffect(() => {
    // Simulação de chamada de API para buscar horários disponíveis
    const fetchAvailableTimes = async () => {
      // Aqui você poderia chamar uma API passando a data selecionada
      const times: AvailableTime[] = [
        { time: '09:30', available: true },
        { time: '10:30', available: true },
        { time: '14:00', available: false },
        { time: '15:00', available: true },
      ];
      setAvailableTimes(times);
    };

    fetchAvailableTimes();
  }, [date]);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setDate(value);
    } else {
      setDate(null);
    }
  };

  const handleTimeSelection = (time: string) => {
    // Aqui você pode armazenar a hora selecionada ou enviar para uma API
    console.log('Horário selecionado:', time);
    console.log('Data selecionada:', formatDate(date));
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    // Desabilita os dias anteriores ao dia atual
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className='flex flex-col mx-auto max-w-7xl items-center'>
      <h1>Selecione um horário</h1>
      <div>
        <Calendar onChange={handleDateChange} value={date} tileDisabled={tileDisabled} />
      </div>
      <div className='flex gap-2 mt-4'>
        {availableTimes.map((timeSlot) => (
          <button
            key={timeSlot.time}
            disabled={!timeSlot.available}
            onClick={() => handleTimeSelection(timeSlot.time)}
            className={timeSlot.available ? 'bg-blue-600 text-white p-2 rounded-[10px]' : 'bg-red-600 text-white p-2 rounded-[10px]'}
          >
            {timeSlot.time}
          </button>
        ))}
      </div>
    </div>
  );
}
