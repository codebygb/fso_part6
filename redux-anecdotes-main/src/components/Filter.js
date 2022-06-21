import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";
let Filter = ({ setFilter }) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    setFilter(event.target.value.toLowerCase());
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

Filter = connect(null, { setFilter })(Filter);

export default Filter;
