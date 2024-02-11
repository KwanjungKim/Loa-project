const HandleSelect = (
  data: any,
  str: string,
  setIsParamMap: React.Dispatch<React.SetStateAction<string>>,
): JSX.Element => {
  const handleData = (data: string, e: any) => {
    setIsParamMap((prev: any) => {
      return {
        ...prev,
        [data]: e,
      };
    });
  };
  return (
    <>
      <select onChange={(e) => handleData(str, e.target.value)}>
        {data.map((value: { id: number; name: string }) => (
          <option key={value.id} value={value.name}>
            {" "}
            {value.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default HandleSelect;
