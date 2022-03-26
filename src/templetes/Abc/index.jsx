import React from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const Abc = () => {
  const { slug } = useParams();
  const history = useHistory();
  console.log(history);

  // useEffect(() => {
  //   setTimeout(() => {
  //     history.push('/');
  //   }, 3000);
  // }, [history]);

  return (
    <div>
      <h1>ABC {slug}</h1>
    </div>
  );
};
