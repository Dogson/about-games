import React from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../Input/Input.component.tsx";
import IconButton from "../../Buttons/IconButton/IconButton.component.tsx";

export type MultiInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  errors?: (string | null)[];
  label?: string;
  onAddInput: () => void;
  onRemoveInput: (index: number) => void;
};

const MultiInput: React.FC<MultiInputProps> = ({
  value,
  onChange,
  errors,
  label,
  onAddInput,
  onRemoveInput,
}) => {
  const handleInputChange = (index: number, newValue: string) => {
    const newValues = [...value];
    newValues[index] = newValue;
    onChange(newValues);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          className="text-turquoise font-title block px-2 text-sm font-medium"
        >
          {label}
        </label>
      )}

      <AnimatePresence initial={false}>
        {value.map((val, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-1 flex gap-2">
              <Input
                value={val}
                onChange={(val) => handleInputChange(index, val)}
                error={errors?.[index]}
              />
              <IconButton
                isSmall
                Icon={FiTrash}
                onClick={() => onRemoveInput(index)}
                className="mt-2"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <IconButton onClick={onAddInput} Icon={FiPlus} />
    </div>
  );
};

export default MultiInput;
