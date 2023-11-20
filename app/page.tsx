"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  parseISO,
  intervalToDuration,
  formatDuration,
} from "date-fns";
import { zhCN } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/time-picker";

interface CaculateDate {
  duration: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ProfileForm() {
  const [date, setDate] = useState<Date>();
  const [caculateDate, setCaculateDate] = useState({} as CaculateDate);
  const dateFormat = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  const addZero = (num: number | undefined) => {
    return !num || num < 10 ? `0${num}` : num;
  };

  const formatDuration = (duration: Duration) => {
    const { years, months, days, hours, minutes, seconds } = duration;
    const temp: { [key: string]: number | undefined } = {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    };
    Object.keys(temp).reduce((res: any, key: string) => {
      res[key] = addZero(temp[key]);
      return res;
    }, {});
    const t = (temp: any) => {
      const { years, months, days, hours, minutes, seconds } = temp;
      return `${years} 年, ${months} 月, ${days} 天, ${hours} 小时, ${minutes} 分钟, ${seconds} 秒`;
    };
    return t(temp);
  };

  useEffect(() => {
    let d = 0 as any;
    if (date) {
      d = setInterval(() => {
        const currentDate = new Date(); // 当前日期时间
        const targetDate = parseISO(format(date, "yyyy-MM-dd HH:mm:ss")); // 指定的目标日期时间
        const days = differenceInCalendarDays(targetDate, currentDate);
        const hours = differenceInHours(targetDate, currentDate);
        const minutes = differenceInMinutes(targetDate, currentDate);
        const seconds = differenceInSeconds(targetDate, currentDate);

        if (seconds < 0) {
          setCaculateDate(() => {
            return {
              duration: formatDuration({
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
              }),
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
            };
          });
          return;
        }

        const duration = intervalToDuration({
          start: currentDate,
          end: targetDate,
        });
        const res = {
          duration: formatDuration(duration),
          days,
          hours,
          minutes,
          seconds,
        };
        setCaculateDate(() => {
          return res;
        });
      }, 1000);
    } else {
      setDate(new Date());
    }
    return () => {
      clearInterval(d);
    };
  }, [date]);

  return (
    <div className="flex  h-full p-4">
      <Tabs defaultValue="account" className="w-1/2">
        <TabsList>
          <TabsTrigger value="account">倒计时</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="flex justify-between gap-4">
            <Card className="w-1/2 h-1/2  max-md:w-full max-md:h-full">
              <CardHeader>
                <CardTitle>设置</CardTitle>
              </CardHeader>
              <CardContent>
                截止日期：
                <DateTimePicker
                  placeholder="选择截止日期"
                  disabled={(date) => {
                    const nowDate = new Date();
                    nowDate.setDate(nowDate.getDate() - 1);
                    return date && date <= nowDate;
                  }}
                  date={date}
                  setDate={setDate}
                />
              </CardContent>
            </Card>
            {date && (
              <Card className="w-1/2 h-1/2  max-md:w-full max-md:h-full">
                <CardHeader>
                  <CardTitle>倒计时</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    距离截止日期 {dateFormat(date)} 还有{" "}
                    <span className=" text-red-500">
                      {caculateDate.duration}
                    </span>
                    <br />
                    按天计算：{" "}
                    <span className=" text-red-500">
                      {caculateDate.days}
                    </span>{" "}
                    天
                    <br />
                    按小时计算：{" "}
                    <span className=" text-red-500">
                      {caculateDate.hours}
                    </span>{" "}
                    小时
                    <br />
                    按分钟计算：
                    <span className=" text-red-500">
                      {caculateDate.minutes}{" "}
                    </span>{" "}
                    分钟
                    <br />
                    按秒计算：
                    <span className=" text-red-500">
                      {" "}
                      {caculateDate.seconds}{" "}
                    </span>{" "}
                    秒
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
