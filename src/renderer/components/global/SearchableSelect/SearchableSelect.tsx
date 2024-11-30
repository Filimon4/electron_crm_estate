import { FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";
import AsyncSelect from "react-select/async";

const SearchableSelect = ({ label, placeholder, onAsyncFetch, props }: any) => {
  const promiseOptions = (inputValue: string) =>
    new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {id: 1, name: 'test1'},
          {id: 2, name: '2test2'},
          {id: 3, name: '3test3'},
          {id: 4, name: 'test4'},
          {id: 5, name: 'test5'},
          {id: 6, name: '6test6'},
          {id: 7, name: '7test7'},
          {id: 8, name: 'test8'},
          {id: 9, name: '90test9'},
        ]);
      }, 1000);
    });
  

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={promiseOptions}
      placeholder={placeholder}
      isClearable
    />
  );
};

export default SearchableSelect