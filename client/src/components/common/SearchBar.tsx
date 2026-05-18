import { Search } from 'lucide-react';
import { Input } from './Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search by name or email' }: SearchBarProps) {
  return <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} leftIcon={<Search className="h-4 w-4" />} />;
}
