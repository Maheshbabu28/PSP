import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

interface ISectionFieldProps {
  label: string;
}

export const SectionFieldWrapper: React.FunctionComponent<ISectionFieldProps> = props => {
  return (
    <Row className="pb-2">
      <Col xs="4">
        <StyledFieldLabel>{props.label}:</StyledFieldLabel>
      </Col>
      <Col>{props.children}</Col>
    </Row>
  );
};

const StyledFieldLabel = styled.div`
  font-weight: bold;
`;
