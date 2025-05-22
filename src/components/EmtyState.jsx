import React from 'react';
import styled from 'styled-components';

const Message = styled.p`
  text-align: center;
  color: #666;
  margin-top: 2rem;
`;

export default function EmptyState({ text }) {
  return <Message>{text}</Message>;
}
