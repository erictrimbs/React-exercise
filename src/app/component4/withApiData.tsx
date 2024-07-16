import React, { useState, useEffect } from 'react';

type WithApiDataProps = {
  apiEndpoint: string;
  [key: string]: any;
};

function withApiData<P>(WrappedComponent: React.ComponentType<P>) {
  return function WithApiDataComponent(props: WithApiDataProps) {
    const { apiEndpoint, ...otherProps } = props;
    const [data, setData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(apiEndpoint);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const result = await response.json();
          setData(result);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [apiEndpoint]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}. Try using https://jsonplaceholder.typicode.com/comments/2 or /users</div>;
    }

    return <WrappedComponent {...(otherProps as P)} data={data} />;
  };
}

export default withApiData;
