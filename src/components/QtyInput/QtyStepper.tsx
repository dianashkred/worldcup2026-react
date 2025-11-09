import type { FC } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";

type Props = {
  value: number;           
  max?: number;            
  min?: number;            
  onChange: (next: number) => void; 
};

const DEFAULT_MAX = 6;
const DEFAULT_MIN = 0;

const QtyStepper: FC<Props> = ({ value, max = DEFAULT_MAX, min = DEFAULT_MIN, onChange }) => {
  const clamp = (v: number) => (Number.isNaN(v) ? min : Math.min(Math.max(v, min), max));

  const [editing, setEditing] = useState<string>(String(value));

  useEffect(() => {
    setEditing(String(value));
  }, [value]);

  const step = (delta: 1 | -1) => {
    const next = clamp(value + delta);
    setEditing(String(next));
    onChange(next);
  };

  const onInputChange = (raw: string) => {
    if (raw === "") {
      setEditing("");
      return;
    }
    if (!/^\d+$/.test(raw)) return;

    const normalized = raw.replace(/^0+(?=\d)/, "");
    setEditing(normalized);
  };

  const onInputBlur = () => {
    const n = Number(editing === "" ? min : editing);
    const c = clamp(n);
    setEditing(String(c));
    onChange(c);
  };

  return (
    <Wrap>
      <Button
        label="−"
        variant="step"
        onClick={() => step(-1)}
        disabled={value <= min}
      />

      <Input
        type="number"
        inputMode="numeric"
        value={editing}
        min={min}
        max={max}
        onChange={(e) => onInputChange(e.target.value)}
        onBlur={onInputBlur}
        onFocus={(e) => e.currentTarget.select()}
        onKeyDown={(e) => {
          if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
        }}
        aria-label="Quantity"
      />

      <Button
        label="+"
        variant="step"
        onClick={() => step(+1)}
        disabled={value >= max}
      />
    </Wrap>
  );
};

export default QtyStepper;

const Wrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 70px;
  height: 40px;
  padding: 0.4rem 0.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  background: #fff;
  transition: all 0.2s ease;

  -moz-appearance: textfield;
  appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }
`;
