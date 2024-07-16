import React, { useState } from 'react';
import withApiData from './withApiData';

type DataComponentProps = {
  data: any;
};

const DataDisplayComponent: React.FC<DataComponentProps> = ({ data }) => {
  if (!data) return null;
  return (
    <div>
      <h1>Data</h1>
      <ul>
        {Array.isArray(data) ? data.map((item, index) => (
          <li key={index}>{item.name}</li>
        )) : (
          <li>{data.name}</li>
        )}
      </ul>
    </div>
  );
};

const HardCodedDataDisplayWithApiData = withApiData(DataDisplayComponent);
const UserGeneratedDataDisplayWithApiData = withApiData(DataDisplayComponent);

const HardCodedDataComponent: React.FC = () => {
  const [apiEndpoint, setApiEndpoint] = useState<string>('');

  const handleButtonClick = () => {
    setApiEndpoint('https://jsonplaceholder.typicode.com/users'); // Example API endpoint
  };

  return (
    <div>
      <h1>API Caller with Hard-Coded URL</h1>
      <button onClick={handleButtonClick}>Fetch Data</button>
      {apiEndpoint && <HardCodedDataDisplayWithApiData apiEndpoint={apiEndpoint} />}
    </div>
  );
};

const UserInputDataComponent: React.FC = () => {
  const [apiEndpoint, setApiEndpoint] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setApiEndpoint(inputValue);
  };

  return (
    <div>
      <h1>API Caller with User-Input URL</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter API URL"
      />
      <button onClick={handleButtonClick}>Fetch Data</button>
      {apiEndpoint && <UserGeneratedDataDisplayWithApiData apiEndpoint={apiEndpoint} />}
    </div>
  );
};

export { UserInputDataComponent, HardCodedDataComponent };
