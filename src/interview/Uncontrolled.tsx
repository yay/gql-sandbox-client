import React, { useState, useRef, useEffect } from 'react';

// In a controlled component, data is handled by a React component.
// In uncontrolled components, data is handled by the DOM itself.

export function ControlledComponent() {
  const [value, setValue] = useState('initial value');
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    alert('A name was submitted: ' + inputRef.current?.value);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:&nbsp;
        <input type="text" ref={inputRef} value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export function UncontrolledComponent() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    alert('A name was submitted: ' + inputRef.current?.value);
    event.preventDefault();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = 'initial value';
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:&nbsp;
        <input type="text" ref={inputRef} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default function Uncontrolled() {
  return (
    <>
      <ControlledComponent />
      <UncontrolledComponent />
    </>
  );
}
