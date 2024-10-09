import React, { useCallback, useEffect, useRef, useState } from 'react';

interface DropdownProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  dropdownStyle?: string;
  childrenStyle?: string;
}
/**
 * Dropdown 공통 컴포넌트
 *
 * @param trigger dropdown visible 값을 토글하는 버튼 디자인 컴포넌트
 * @param dropdownStyle dropdown box의 css 조정시 사용
 * @param childrenStyle dropdown box 내부 컴포넌트의 css 조정시 사용
 *
 * @example
 * <DropDown
 *   dropdownStyle="custom-class"
 *   childrenStyle="custom-class"
 *   trigger={<button type="button">메뉴</button>}
 * >
 *   <button className="h-[46px]" type="button">
 *     마이 히스토리
 *   </button>
 *   <button className="h-[46px]" type="button">
 *     계정 설정
 *   </button>
 * </DropDown>
 */

export default function Dropdown({
  children,
  trigger,
  dropdownStyle,
  childrenStyle,
}: DropdownProps) {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsVisible((prevState) => !prevState);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // 트리거 영역 클릭 시 토글
      if (
        triggerRef.current &&
        triggerRef.current.contains(event.target as Node)
      ) {
        toggleDropdown();
        return;
      }

      // 드롭다운 내부 또는 외부 클릭 시 닫기
      if (dropdownRef.current) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [closeDropdown, toggleDropdown]);

  return (
    <div>
      <div ref={triggerRef}>{trigger}</div>
      <div ref={dropdownRef} className="relative">
        {isVisible && (
          <div
            className={`
              absolute flex max-h-[12.5rem] w-[8.4375rem] 
              flex-col overflow-y-auto rounded-xl border border-solid 
              border-primary border-opacity-10 
              bg-secondary p-2 
              ${dropdownStyle}
            `}
          >
            {React.Children.map(children, (child) => (
              <div
                className={`
                 flex items-center justify-center
                  rounded-xl hover:bg-tertiary
                    ${childrenStyle}
                `}
              >
                {child}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
