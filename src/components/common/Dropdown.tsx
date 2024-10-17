import React, {
  HTMLAttributes,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface DropdownProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  dropdownStyle?: HTMLAttributes<HTMLDivElement>['className'];
}

interface ChildProps {
  onClick?: () => void;
}

/**
 * Dropdown 공통 컴포넌트
 *
 * @param trigger dropdown visible 값을 토글하는 버튼 디자인 컴포넌트
 * @param dropdownStyle dropdown box의 css 조정시 사용
 *
 * @example
 *   <Dropdown
 *    trigger={
 *      <button className="custom-trigger" type="button">
 *        {selectedItem}
 *      </button>
 *    }
 *    dropdownStyle="custom-style"
 *  >
 *    <button
 *      type="button"
 *      className="h-[46px]"
 *      onClick={() => handleClick('최신순')}
 *   >
 *     최신순
 *    </button>
 *    <button type="button" onClick={() => handleClick('추천순')}>
 *      추천순
 *    </button>
 *  </Dropdown>
 */

export default function Dropdown({
  children,
  trigger,
  dropdownStyle,
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
      } else if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [closeDropdown, toggleDropdown]);

  return (
    <div className="h-[24px] w-[24px]">
      <div ref={triggerRef}>{trigger}</div>
      {isVisible && (
        <div
          ref={dropdownRef}
          className={`
          absolute flex max-h-[12.5rem] w-[8.4375rem]
          flex-col overflow-y-auto rounded-xl border border-solid 
          border-primary border-opacity-10 bg-secondary p-2 
          ${dropdownStyle}
        `}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as ReactElement, {
                className: `
                  flex items-center justify-center
                  rounded-xl hover:bg-tertiary
                   ${child.props.className}
                `,
                onClick: () => {
                  (child.props as ChildProps).onClick?.();
                  closeDropdown();
                },
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
}
