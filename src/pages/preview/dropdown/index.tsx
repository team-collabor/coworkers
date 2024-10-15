import Dropdown from '@/components/common/dropdown';
import { useState } from 'react';

export default function DropdownPreview() {
  const [selectedItem, setSelectedItem] = useState<string>('메뉴');

  const handleClick = (item: string) => {
    // eslint-disable-next-line no-console
    console.log(`${item} 선택됨`);
    setSelectedItem(item);
  };

  return (
    <Dropdown
      trigger={
        <button className="" type="button">
          {selectedItem}
        </button>
      }
      dropdownStyle=""
    >
      <button
        type="button"
        className="h-[46px]"
        onClick={() => handleClick('마이 히스토리')}
      >
        마이 히스토리
      </button>
      <button type="button" onClick={() => handleClick('계정 설정')}>
        계정 설정
      </button>
    </Dropdown>
  );
}
