import { type SelectProps } from '@radix-ui/react-select';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SELECT_OPTIONS } from '@/data/constants';

interface StoreNameFilesProps extends Pick<SelectProps, 'value' | 'onValueChange'> {}

const StoreNameField = ({ value, onValueChange }: StoreNameFilesProps) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger className='w-[180px]'>
      <SelectValue placeholder='Назва магазину' />
    </SelectTrigger>
    <SelectContent>
      {SELECT_OPTIONS.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default StoreNameField;
