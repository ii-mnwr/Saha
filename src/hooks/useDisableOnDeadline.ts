import { useState, useEffect } from 'react';

const useDisableOnDeadline = (application_deadline: any) => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Convert application_deadline to a Date object
    const deadline = new Date(application_deadline);
    const today = new Date();

    // If today's date is after the deadline, set isDisabled to true
    setIsDisabled(today > deadline);
  }, [application_deadline]);

  return isDisabled;
};

export default useDisableOnDeadline;
