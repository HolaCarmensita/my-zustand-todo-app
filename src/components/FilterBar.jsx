import styled from 'styled-components';

export const Bar = styled.nav``;

export const FilterButton = styled.button`
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.primary : theme.surface};
  color: ${({ $isActive, theme }) => ($isActive ? '#fff' : theme.text)};
`;

export default function FilterBar({ filterMode, onChange }) {
  const modes = [
    { key: 'today', label: 'Today' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'all', label: 'All Tasks' },
  ];

  return (
    <Bar>
      {modes.map(({ key, label }) => (
        <FilterButton
          key={key}
          $isActive={filterMode === key}
          onClick={() => onChange(key)}
        >
          {label}
        </FilterButton>
      ))}
    </Bar>
  );
}
