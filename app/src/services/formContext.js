import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const FormContext = createContext();

export const FormProvider = ({ children, initialState = {} }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE':
        return { ...state, ...action.payload };
      case 'RESET':
        return { ...initialState };
      default:
        return { ...state };
    }
  };

  return (
    <FormContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialState: PropTypes.object,
};

FormProvider.defaultProps = {
  initialState: {},
};

export const useFormContext = () => useContext(FormContext);

FormContext.propTypes = {
  children: PropTypes.node.isRequired,
};
