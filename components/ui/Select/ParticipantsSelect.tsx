import Select, {
  CSSObjectWithLabel,
  GroupBase,
  StylesConfig,
} from 'react-select'
import { Option } from './components/Option'
import { MultiValue } from './components/MultiValue'

export const customStyles: StylesConfig<
  ParticipantOption,
  true,
  GroupBase<ParticipantOption>
> = {
  control: (base: CSSObjectWithLabel, state) => ({
    ...base,
    backgroundColor: '#141414',
    borderColor: state.isFocused ? '#FFDD00' : '#333333',
    boxShadow: state.isFocused ? '0 0 0 1px #FFDD00' : 'none',
    '&:hover': {
      borderColor: '#FFDD00',
    },
    color: '#F4F4F4',
    minHeight: '40px',
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: '#111111',
    zIndex: 20,
  }),
  option: (base: CSSObjectWithLabel, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#FFDD00'
      : state.isFocused
        ? '#2a2a2a'
        : '#111111',
    color: state.isSelected ? '#111111' : '#F4F4F4',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#FFDD00',
      color: '#111111',
    },
  }),
  multiValue: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: '#333333',
  }),
  multiValueLabel: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#F4F4F4',
  }),
  multiValueRemove: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#FFDD00',
    ':hover': {
      backgroundColor: '#FFDD00',
      color: '#111111',
    },
  }),
  placeholder: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#B3B3B3',
  }),
  input: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#F4F4F4',
  }),
  singleValue: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#F4F4F4',
  }),
}

export type ParticipantOption = {
  value: number
  label: string
  avatar: string
}

export type ParticipantsSelectProps = {
  options: ParticipantOption[]
  value: ParticipantOption[]
  isLoading?: boolean
  onChange: (selectedIds: number[]) => void
  error?: string
}

export const ParticipantsSelect = ({
  options,
  value,
  isLoading,
  onChange,
  error = '',
}: ParticipantsSelectProps) => {
  return (
    <div>
      <label className="text-light font-medium mb-1 block">
        Select Participants <span className="text-red-500">*</span>
      </label>
      <Select
        isMulti
        options={options}
        value={value}
        isLoading={isLoading}
        onChange={(selected) => onChange(selected.map((s) => s.value))}
        className="react-select-container"
        classNamePrefix="rs"
        styles={customStyles}
        components={{ Option, MultiValue }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
