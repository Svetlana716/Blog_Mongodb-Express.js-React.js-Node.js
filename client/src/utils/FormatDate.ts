class FormatDate {
  dayMonthYear(date: string) {
    return new Date(date).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  hourMinuteSecond(date: string) {
    return new Date(date).toLocaleString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
}

export default new FormatDate();
