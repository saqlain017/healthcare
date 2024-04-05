import {
  BellIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  LockOpenIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";

export const patientsOverviewData = [
  {
    icon: BellIcon,
    color: "text-blue-gray-300",
    title: "New patient registered",
    description: "John Doe, 25 years old",
  },
  {
    icon: PlusCircleIcon,
    color: "text-blue-gray-300",
    title: "Patient discharge",
    description: "Jane Smith, recovery completed",
  },
  {
    icon: ShoppingCartIcon,
    color: "text-blue-gray-300",
    title: "Critical condition update",
    description: "Patient ID: 12345, requires immediate attention",
  },
  {
    icon: CreditCardIcon,
    color: "text-blue-gray-300",
    title: "New medical records added",
    description: "Patient ID: 67890, updated records available",
  },
  {
    icon: LockOpenIcon,
    color: "text-blue-gray-300",
    title: "Appointment scheduled",
    description: "Tom Johnson, appointment set for next week",
  },
];

export default patientsOverviewData;
