import AddFieldMap from "../components/addfield/addfieldmap/AddFieldMap";
import Loading from "../components/common/Loading/Loading";
import { useState } from "react";

const AddField = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (isSubmitting) {
    return <Loading />;
  }

  return <AddFieldMap setIsSubmitting={setIsSubmitting} />;
};

export default AddField;
