"use client";

import { Fragment, useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";

interface Item {
  id: number;
  name: string;
  group?: string;
}

interface Props {
  items: Item[];
  onChange?: (selected: Item[]) => void;
}

export default function MultiSelect({ items, onChange }: Props) {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const toggleItem = (item: Item) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      const newSelection = selectedItems.filter((i) => i.id !== item.id);
      setSelectedItems(newSelection);
      onChange?.(newSelection);
    } else {
      const newSelection = [...selectedItems, item];
      setSelectedItems(newSelection);
      onChange?.(newSelection);
    }
  };

  const selectAll = () => {
    setSelectedItems(items);
    onChange?.(items);
  };

  const clearAll = () => {
    setSelectedItems([]);
    onChange?.([]);
  };

  return (
    <div className="w-72">
      <div className="flex justify-between mb-2">
        <button onClick={selectAll} className="text-sm text-blue-500 hover:underline">
          Select All
        </button>
        <button onClick={clearAll} className="text-sm text-blue-500 hover:underline">
          Clear
        </button>
      </div>

      <Listbox value={selectedItems} onChange={setSelectedItems} multiple>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded border bg-white py-2 pl-3 pr-10 text-left shadow focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
            {selectedItems.length === 0 ? "Select..." : `${selectedItems.length} selected`}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items.map((item) => (
              <Listbox.Option key={item.id} as={Fragment} value={item}>
                {({ active }) => (
                  <li
                    className={`cursor-default select-none py-2 pl-3 pr-9 relative ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`}
                    onClick={() => toggleItem(item)}
                  >
                    <span className="block truncate">
                      {item.name} {item.group ? `(${item.group})` : ""}
                    </span>
                    {selectedItems.find((i) => i.id === item.id) && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                        <CheckIcon className="h-5 w-5" />
                      </span>
                    )}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
