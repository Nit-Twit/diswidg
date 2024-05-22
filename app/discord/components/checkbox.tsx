"use client";
import { useState, ChangeEventHandler, HTMLProps } from "react";
import Heading from "./heading";

interface CheckboxProps extends HTMLProps<HTMLInputElement> {
    children: React.ReactNode;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    subtitle: string;
  }
  

export default function Checkbox<HTMLInputElement>({
  children,
  checked,
  onChange,
  subtitle,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <div className={className + " flex-col w-[70%]"}>
        <div className={"flex flex-row justify-start items-center gap-2 w-full"}>
          <input
            {...props}
            onChange={onChange}
            checked={checked}
            type="checkbox"
            className="hover-active-bg hover:bg-midbg appearance-none checked:bg-blurple disabled:bg-disabled border-darkbg rounded-md indeterminate:bg-darkbg border-2 w-6 h-6"
          />
          <Heading>
            <h1 className="flex-1 justify-self-start text-lg">{children}</h1>
          </Heading>
        </div>
        <div className="flex flex-row justify-start items-center text-gray-300 text-xs">{"\u2022 "+subtitle}</div>
    </div>
  );
}
