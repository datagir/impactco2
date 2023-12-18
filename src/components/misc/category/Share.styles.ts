import styled from 'styled-components'

export const Meta = styled.div`
  border: 1px solid var(--neutral-20);
  border-radius: 4px;
  padding: 0.75rem;
  text-align: left;

  img  {
    margin-bottom: 0.5rem;
    width: 100%;
    height: auto;
  }

  p {
    margin-bottom: 0;
  }
`

export const Buttons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin: 2rem auto;

  button {
    background-color: transparent !important;
    border: 1px solid var(--secondary-20) !important;
    border-radius: 4px;
    color: var(--secondary-60) !important;
    cursor: pointer;
    line-height: 0 !important;
    padding: 0.875rem !important;

    &:hover {
      background-color: var(--secondary-20) !important;
      border: 1px solid var(--secondary-30) !important;
      color: var(--secondary-70) !important;
    }

    &:focus {
      outline: 3px solid var(--secondary-40) !important;
      outline-offset: 2px !important;
    }

    &:active {
      background-color: var(--secondary-30) !important;
      color: var(--secondary-80) !important;
    }

    &:disabled {
      background-color: transparent !important;
      border: 1px solid var(--secondary-20) !important;
      color: var(--secondary-30) !important;
      cursor: not-allowed !important;
    }
  }
`
