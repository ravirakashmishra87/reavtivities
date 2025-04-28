import { DateArg, format } from "date-fns";

export default function formatDate(date: DateArg<Date>) {
    return format(date, 'dd MMM yyy h:mm a')
}