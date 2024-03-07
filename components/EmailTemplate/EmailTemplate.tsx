import React from "react";

const EmailTemplate = ({ CustomerData }: { CustomerData: string }) => {
  return (
    <div>
      Your have received a list of your current invoice. Please click{" "}
      <a href={CustomerData}>here</a>
    </div>
  );
};

export default EmailTemplate;
