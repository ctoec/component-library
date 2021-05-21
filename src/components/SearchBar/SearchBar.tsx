import React, { useState } from 'react';
import { Search } from 'carbon-components-react';
import { Button } from '../Button/Button';

type SearchProps = {
  id: string;
  labelText: string;
  placeholderText: string;
  onSearch: (query: string) => {};
  className?: string;
}

export const SearchBar: React.FC<SearchProps> = ({
  id,
  labelText,
  placeholderText,
  onSearch,
  className,
}) => {
  const [queryText, setQueryText] = useState("");
  return (
    <div className={className || ""}>
      <Search
        id={id}
        labelText={labelText}
        placeholder={placeholderText}
        onChange={(e: any) => {
          setQueryText(e.target.value);
          return e.target.value;
        }}
      />
      <Button
        className="margin-top-2 margin-bottom-4"
        text="Search"
        onClick={() => onSearch(queryText)}
        disabled={queryText === ""}
      />
    </div>
  );
};