"use client";
import { API_URL } from "@/api/constants";
import QueryProvider from "@/providers/QueryProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import DatePicker, { ReactDatePicker } from "react-datepicker";


async function getHolidaysForCurrentYear () {
    const currentYear = new Date().getFullYear();
    
    const url = API_URL + `/delivery-pickup-schedules?populate=*&filters[title][$eq]=${currentYear}`
    const {data:{data}} = await axios.get(url);

    if(!data?.[0]) {
        return []
    }

    return formatHolidays(data[0]);
}

function formatHolidays (data: any) {
    const {holidays} = data?.attributes;

    if(!holidays && holidays.length == 0) {
        return [];
    }

    return holidays.map((item : any) => ({date: item.date, holidayName: item.name}));

}

export default function DeliveryDate({onChange, disabled}: {onChange: (date : Date | null) => void, disabled?: boolean}) {
    
  return (
    <QueryProvider>
        <DeliveryPickupDatepicker onChange={onChange} disabled={disabled} />
    </QueryProvider>
  )
}






function DeliveryPickupDatepicker ({onChange, disabled}: {onChange: (date : Date | null) => void, disabled?: boolean}) {
    const {data, isPending} = useQuery({queryKey: ["deliveryDate"], queryFn: getHolidaysForCurrentYear});
    const [startDate, setStartDate] = useState<Date | null>(null);

    if(isPending) {
        return null;
    }


    if(!data) {
        return null;
    }

    const isWeekday = (date : any) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
      };

      if(!data.length) {
        return;
      }

    function sevenDaysfromToday() {
        
        const currentDate = new Date();

        const dateArray = [];

        for (let i = 0; i < 7; i++) {
            const nextDate = new Date();
            nextDate.setDate(currentDate.getDate() + i);
            dateArray.push(nextDate);
        }

        return dateArray;
    }  

    function changeDate(date : Date | null) {
        setStartDate(date);
        onChange(date);
    }

    return (
        <DatePicker 
            selected={startDate} 
            onChange={changeDate}
            excludeDates={[...data.map((item : any) => new Date(item.date)), ...sevenDaysfromToday()]}
            filterDate={isWeekday}
            disabled={disabled}
            holidays={data}
            className="w-full placeholder:text-black/30 text-sm border-1 border-gray/20 text-gray-darker rounded-[5px] focus:border-primary focus:ring-primary py-[15px] 
            px-[20px]"
        />
    )
}
