import { ReactNode } from "react";
import { ChangeHandler, RefCallBack } from "react-hook-form";

interface swensenCheckbox {
  name: string;
  onChange: ChangeHandler;
  inputRef: RefCallBack;
  children: ReactNode;
}

export function SwensenCheckbox(props: swensenCheckbox) {
  const { name, onChange, inputRef, children } = props;
  return (
    <div className="flex flex-row gap-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="peer hidden"
          id={name}
          name={name}
          ref={inputRef}
          onChange={onChange}
        />
        <div className="w-5 h-5 rounded border-1 border-gray-400 peer-checked:bg-red-500 peer-checked:border-red-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="size-[14px] text-white peer-checked:block" viewBox="0 0 20 20" fill="currentColor"
            stroke="currentColor" strokeWidth="1">
            <path fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
      </label>
      {children}
    </div>
  )
}
