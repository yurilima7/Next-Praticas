"use client";
import React from "react";
// import {Calendar} from "@nextui-org/calendar";
import {parseDate, today, getLocalTimeZone} from '@internationalized/date';
import Calendar from "./calendar";

export default function Home() {
  return (
    <Calendar />
  );
  // return (
  //   <>
  //     <div className="flex justify-center mt-4">
  //       <Calendar
  //         aria-label="Date (Min Date Value)"
  //         defaultValue={today(getLocalTimeZone())}
  //         minValue={today(getLocalTimeZone())}
          
  //         classNames={{
  //           prevButton: "custom-prev-button",
  //           nextButton: "custom-next-button",
  //           headerWrapper: "custom-header-wrapper",
  //           title: "title",
  //           gridBody: "grid-body",
  //           gridHeaderCell: "grid-header-cell",
  //         }}
  //       />
  //     </div> 


  //   </>
  // );
}
