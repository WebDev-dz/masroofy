import React, { useState } from "react";
import {
  // Income-related icons
  Wallet,
  DollarSign,
  Briefcase,
  Building,
  Award,
  GraduationCap,
  Landmark,
  PiggyBank,
  
  // Expense-related icons
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Phone,
  Gift,
  Coffee,
  CreditCard,
  Plane,
  Bus,
  Train,
  Book,
  School,
  Laptop,
  Smartphone,
  Hospital,
  Pill,
  Shirt,
  Dumbbell,
  Gamepad,
  Music,
  Film,
  Tv,
  Wifi,
  Zap,
  ShoppingBag,
  Baby,
  Scissors,
  UtensilsCrossed,
  Hotel,
} from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";

// Predefined icons grouped by type
const CATEGORY_ICONS = {
  income: [
    { name: "Wallet", icon: Wallet, label: "Wallet" },
    { name: "DollarSign", icon: DollarSign, label: "Salary" },
    { name: "Briefcase", icon: Briefcase, label: "Work" },
    { name: "Building", icon: Building, label: "Real Estate" },
    { name: "Award", icon: Award, label: "Bonus" },
    { name: "GraduationCap", icon: GraduationCap, label: "Teaching" },
    { name: "Landmark", icon: Landmark, label: "Investment" },
    { name: "PiggyBank", icon: PiggyBank, label: "Savings" },
  ],
  expense: [
    // Transportation
    { name: "Car", icon: Car, label: "Car" },
    { name: "Plane", icon: Plane, label: "Travel" },
    { name: "Bus", icon: Bus, label: "Bus" },
    { name: "Train", icon: Train, label: "Train" },
    
    // Housing & Utilities
    { name: "Home", icon: Home, label: "Housing" },
    { name: "Wifi", icon: Wifi, label: "Internet" },
    { name: "Zap", icon: Zap, label: "Electricity" },
    
    // Education & Technology
    { name: "Book", icon: Book, label: "Books" },
    { name: "School", icon: School, label: "Education" },
    { name: "Laptop", icon: Laptop, label: "Computer" },
    { name: "Smartphone", icon: Smartphone, label: "Phone" },
    
    // Health & Wellness
    { name: "Hospital", icon: Hospital, label: "Healthcare" },
    { name: "Pills", icon: Pill, label: "Medicine" },
    { name: "Dumbbell", icon: Dumbbell, label: "Fitness" },
    
    // Shopping & Personal
    { name: "ShoppingCart", icon: ShoppingCart, label: "Shopping" },
    { name: "ShoppingBag", icon: ShoppingBag, label: "Retail" },
    { name: "Shirt", icon: Shirt, label: "Clothing" },
    { name: "Gift", icon: Gift, label: "Gifts" },
    
    // Food & Dining
    { name: "Utensils", icon: Utensils, label: "Restaurant" },
    { name: "UtensilsCrossed", icon: UtensilsCrossed, label: "Dining" },
    { name: "Coffee", icon: Coffee, label: "Cafe" },
    
    // Entertainment & Leisure
    { name: "Gamepad", icon: Gamepad, label: "Gaming" },
    { name: "Music", icon: Music, label: "Music" },
    { name: "Film", icon: Film, label: "Movies" },
    { name: "Tv", icon: Tv, label: "Television" },
    
    // Other
    { name: "CreditCard", icon: CreditCard, label: "Card" },
    { name: "Baby", icon: Baby, label: "Children" },
    { name: "Scissors", icon: Scissors, label: "Services" },
    { name: "Hotel", icon: Hotel, label: "Accommodation" },
  ],
};

type IconPickerProps = {
  type?: "income" | "expense";
} & ControllerRenderProps<{
  name: string;
  icon: string;
  theme: string;
  id: string;
  isActive: boolean;
  parentId?: string | undefined;
}, "icon">




export const IconsPicker: React.FC<IconPickerProps> = ({ onChange, type = "expense", value  }) => {

  const handleSelect = (iconName: string) => {
    if (onChange) onChange(iconName);
  };

  const icons = CATEGORY_ICONS[type];

  return (
    <div className="p-2">
      <div className="grid grid-cols-4 gap-2">
        {icons.map(({ name, icon: Icon, label }) => (
          <button
            key={name}
            className={`p-2 px-1 border rounded flex flex-col items-center justify-center hover:bg-blue-50 transition ${
              value === name ? "ring-2 ring-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => handleSelect(name)}
            title={label}
          >
            <Icon size={20} />
            {/* <span className="text-xs mt-1 text-gray-600">{label}</span> */}
          </button>
        ))}
      </div>
    </div>
  );
};

